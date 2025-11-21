module Api
  module V1
    class BooksController < Apiv1Controller 

      def index
        results = BooksServices::Index.new(params).call
        api_response("controllers.books.index.success", :ok, results)
      rescue StandardError => e
        api_response("controllers.books.index.error", :unprocessable_entity, e.message)
      end

      def search
        response = BooksServices::Search.new(params).call
        api_response("controllers.books.search.success", :ok, response)
      rescue StandardError => e
        api_response("controllers.books.search.error", :not_found, e.message)
      end

      def create
        BooksServices::Create.new(create_params).call
        api_response("controllers.books.create.success", :created)
      rescue StandardError => e
        api_response("controllers.books.create.error", :unprocessable_entity, e.message)
      end
      
      def destroy
        book = Book.find_by(id: params[:id])
        return api_response("controllers.books.destroy.not_found", :not_found) unless book

        book.destroy
        api_response("controllers.books.destroy.success", :ok)
      rescue StandardError => e
        api_response("controllers.books.destroy.error", :unprocessable_entity, e.message)
      end

      private

      def create_params
        params.require(:book).permit(:isbn)
      end
    end
  end
end
