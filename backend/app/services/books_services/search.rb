module BooksServices
  class Search
    def initialize(params)
      @params = params
    end

    def call
      isbn = @params[:book][:isbn]&.strip
      raise ArgumentError, I18n.t("services.books.search.errors.isbn") unless isbn.present?
      
      response = fetch_book(isbn)
      
      return {
        isbn: extract_isbn(response),
        title: response["title"], 
        page_count: response["number_of_pages"],
        published_at: FormatDate.extract_year(response["publish_date"]),
        raw_data: response
      }
    end
    private
    
    def extract_isbn(response)
      response["isbn_13"]&.first ||
        response["isbn_10"]&.first ||
        nil
    end

    def fetch_book(isbn)
      ApiServices::FetchBooks.new("https://openlibrary.org/isbn/#{isbn}.json").call
    end
  end
end