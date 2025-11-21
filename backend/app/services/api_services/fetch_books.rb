require 'net/http'
require 'uri'
require 'json'

module ApiServices
  class FetchBooks
    def initialize(url)
      @url = url
    end

    def call
      response = perform_request(@url)
      process_response(response)
    rescue StandardError => e
      handle_general_error(e)
    end

    private

    def perform_request(url)
      uri = URI(url)
      http = build_http(uri)

      request = Net::HTTP::Get.new(uri)
      http.request(request)
    end

    def build_http(uri)
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = (uri.scheme == "https")
      http
    end

    def process_response(response)
      return follow_redirect(response) if response.is_a?(Net::HTTPRedirection)

      case response
      when Net::HTTPOK
        parse_json(response.body)
      when Net::HTTPNotFound
        raise BookNotFound, I18n.t("services.fetch_book.errors.book_not_found")
      else
        raise StandardError, I18n.t(
          "services.fetch_book.errors.openlibrary.request_failed",
          status: response.code
        )
      end
    end

    def follow_redirect(response)
      location = response['location']
      self.class.new(location).call
    end

    def parse_json(body)
      JSON.parse(body)
    rescue JSON::ParserError
      raise StandardError, I18n.t("services.fetch_book.errors.openlibrary.invalid_response")
    end

    def handle_general_error(error)
      raise StandardError, I18n.t(
        "services.fetch_book.errors.openlibrary.connection_failed",
        error: error.message
      )
    end
  end
end
