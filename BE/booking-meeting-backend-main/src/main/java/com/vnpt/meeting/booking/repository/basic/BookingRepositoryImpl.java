package com.vnpt.meeting.booking.repository.basic;

import com.vnpt.meeting.booking.entity.Booking;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

@Repository
public class BookingRepositoryImpl extends EntityRepository implements BookingRepositoryBasic {
    @Override
    public Page<Booking> getBooking(String title, String fromDate, String toDate,
                                    Long memberId, Long roomId, Long createByUserId,
                                    Integer status, Integer priority,
                                    PageRequest pageRequest) {
        String sqlWhere = "";
        Map<String, Object> params = new HashMap<>();
        if (memberId != null) {
            sqlWhere += " AND b.members LIKE :memberId";
            params.put("memberId", "%" + memberId + "%");
        }

        if (roomId != null) {
            sqlWhere += " AND b.room_id = :roomId";
            params.put("roomId", roomId);
        }

        if (createByUserId != null) {
            sqlWhere += " AND b.admin_id = :createByUserId";
            params.put("createByUserId", createByUserId);
        }

        if (status != null) {
            sqlWhere += " AND b.status= :status";
            params.put("status", status);
        }

        if (priority != null) {
            sqlWhere += " AND b.priority= :priority";
            params.put("priority", priority);
        }

        if (title != null && !"".equalsIgnoreCase(title)) {
            sqlWhere += " AND b.title LIKE :title";
            params.put("title", "%" + title + "%");
        }

        if (fromDate != null && !"".equalsIgnoreCase(fromDate) && toDate != null && !"".equalsIgnoreCase(toDate)) {
            sqlWhere += " AND b.created_date between :fromDate AND :toDate";
            params.put("fromDate", fromDate);
            params.put("toDate", toDate);
        }
        String sqlQuery = "SELECT * FROM booking b WHERE 1=1 " + sqlWhere;

        String sqlCountQuery = "SELECT count(*) FROM booking b where 1=1" + sqlWhere;
        LOGGER.info("Query {}", sqlQuery);
        return fetchPaging(sqlQuery, sqlCountQuery, params, Booking.class, pageRequest);
    }

    private final static Logger LOGGER = LoggerFactory.getLogger(BookingRepositoryImpl.class);
}
