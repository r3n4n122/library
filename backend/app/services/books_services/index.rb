module BooksServices
  class Index
    DEFAULT_PAGE     = 1
    DEFAULT_PER_PAGE = 10
    DEFAULT_ORDER    = "id DESC"

    def initialize(params)
      @params = params || {}
    end

    def call
      books = Book.all
      books = apply_search(books)
      books = apply_order(books)
      books = apply_pagination(books)

      format_books(books)
    end

    private

    def apply_search(scope)
      return scope unless @params[:search].present?

      scope.where("books.title ILIKE ?", "%#{@params[:search].strip}%")
    end

    def apply_order(scope)
      order = @params[:order_by].presence || DEFAULT_ORDER
      return scope.order(DEFAULT_ORDER) if order.match?(/;/)
      scope.order(order)
    end

    def apply_pagination(scope)
      page     = @params[:page]     || DEFAULT_PAGE
      per_page = @params[:per_page] || DEFAULT_PER_PAGE

      scope.page(page).per(per_page)
    end

    def format_books(books)
      formatted_data = books.map do |book|
        {
          id: book.id,
          isbn: book.isbn,
          title: book.title,
          page_count: book.page_count.zero? ? "Não informado" : book.page_count,
          published_at: book.published_at.zero? ? "Não informado" : book.published_at
        }
      end

      Pagination.records(books).merge(data: formatted_data)
    end
  end
end
