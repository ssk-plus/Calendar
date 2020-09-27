
jQuery(function ($) {

    $(document).ready(function () {
        setDisplayYearMonth();
        setYear();
    })

    // 表示する年を設定する
    function setDisplayYearMonth() {
        let date = new Date();
        $("#displayYearMonth").text(date.getFullYear());
    }

    // 年を設定する
    function setYear() {
        for (let i = 0; i < 12; i++) {
            $("#areaCalendar").append($(".calendar:first").clone().css("display", "block"));
            setMonth(i);
            setDay(i);
        }
    }

    // 月を設定する
    function setMonth(i) {
        let yearMonth = $("#displayYearMonth").text();
        let date = new Date(yearMonth, i, 1);
        $(".year-month:last").text(date.getFullYear() + "." + parseInt(date.getMonth() + 1));
    }

    // 月のカレンダーを設定する
    function setDay(i) {

        $(".area-week:last").nextAll().remove();
        let yearMonth = $(".year-month:last").text();
        // 今月を取得する
        let firstDay = new Date(yearMonth, i, 1);
        let firstDayOfWeek = firstDay.getDay();
        // 今月の末日を取得する
        let lastDay = new Date(yearMonth, i + 1, 0);

        let day = 1;
        let weekStr = "";
        while (true) {
            weekStr += "<tr>";
            const list = [1, 2, 3, 4, 5, 6, 0];
            for (const num of list) {
                if (day == 1 && firstDayOfWeek > num) {
                    // 初週かつ初日より前の場合、空白にする
                    weekStr += "<td></td>";
                } else if (day > lastDay.getDate()) {
                    // 最終週かつ最終日より後の場合、空白にする
                    weekStr += "<td></td>";
                } else {
                    if (num == 0 || num == 6) {
                        // 土日の場合
                        weekStr += "<td class='holiday'>" + day++ + "</td>";
                    } else {
                        // 平日の場合
                        weekStr += "<td>" + day++ + "</td>";
                    }
                }
            }
            weekStr += "</tr>";

            // 最終日の場合、ループ終了
            if (day >= lastDay.getDate() + 1) {
                break;
            }
        }
        $(".calendar:last").append(weekStr);
    }

    // 1年前のカレンダーを設定する
    $(document).on("click", ".btn-previous", function () {
        let yearMonth = $("#displayYearMonth").text();
        let preMonth = new Date(parseInt(yearMonth) - 1, 1, 1);
        $("#displayYearMonth").text(preMonth.getFullYear());
        $("#areaCalendar").find(".calendar").nextAll().remove();
        setYear();
    })

    // 1年先のカレンダーを設定する
    $(document).on("click", ".btn-next", function () {
        let yearMonth = $("#displayYearMonth").text();
        let nextMonth = new Date(parseInt(yearMonth) + 1, 1, 1);
        $("#displayYearMonth").text(nextMonth.getFullYear());
        $("#areaCalendar").find(".calendar").nextAll().remove();
        setYear();
    })

})
