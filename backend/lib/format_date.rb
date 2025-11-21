class FormatDate
  def self.extract_year(publish_date)
    return nil unless publish_date
    match = publish_date.match(/\d{4}/)
    match ? match[0].to_i : nil
  end
end