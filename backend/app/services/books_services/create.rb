module BooksServices
  class Create
    def initialize(params)
      @params = params
    end

    def call
      isbn = @params[:isbn].presence
      raise ArgumentError, I18n.t("services.books.create.errors.isbn_required") if isbn.nil?
      isbn = isbn.strip
      response = fetch_book(isbn)

      extracted_isbn = extract_isbn(response)
      raise StandardError, I18n.t("services.books.create.errors.isbn_not_found") if extracted_isbn.nil?

      raise StandardError, I18n.t("services.books.create.errors.book_exists") if book_exists?(extracted_isbn)

      create_book(response, extracted_isbn)
    end

    private

    def extract_isbn(response)
      response["isbn_13"]&.first ||
      response["isbn_10"]&.first
    end

    def fetch_book(isbn)
      ApiServices::FetchBooks
        .new("https://openlibrary.org/isbn/#{isbn}.json")
        .call
    end

    def book_exists?(isbn)
      Book.exists?(isbn: isbn)
    end

    def create_book(response, isbn)
      Book.create!(
        isbn: isbn,
        title: response["title"],
        page_count: response["number_of_pages"] || 0,
        raw_data: response,
        published_at: FormatDate.extract_year(response["publish_date"])
      )
    end
  end
end
