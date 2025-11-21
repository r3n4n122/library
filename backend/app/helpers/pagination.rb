module Pagination
  def self.records(records)
    {
      'current': records.current_page,
      'previous': records.prev_page,
      'next': records.next_page,
      'limit': records.limit_value,
      'total_pages': records.total_pages,
      'total_count': records.total_count,
      'data': records 
    }
  end
end