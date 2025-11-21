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

      Pagination.records(books)
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
  end
end
