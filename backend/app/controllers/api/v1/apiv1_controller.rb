module Api
  module V1
    class Apiv1Controller < ActionController::API
      def api_response(message, status = :ok, data = nil, skip_translate = false)
        message = skip_translate ? message : I18n.t(message)
        render json: { message: message, data: data }, status: status
        nil
      end
    end
  end
end