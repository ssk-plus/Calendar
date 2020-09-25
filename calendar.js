
jQuery(function ($) {

    $(document).ready(function () {
        setMonth();
        setDay();
    })

    // 今月を設定する
    function setMonth() {
        let date = new Date();
        $("#dateYearMonth").text(date.getFullYear() + "." + (date.getMonth() + 1));
    }

    // 年月に対応したカレンダーを設定する
    function setDay() {
        $("#areaWeek").nextAll().remove();

        let dateData = $("#dateYearMonth").text().split(".");
        // 今月を取得する
        let firstDay = new Date(dateData[0], parseInt(dateData[1]) - 1, 1);
        let firstDayOfMonth = firstDay.getDay();
        // 今月の末日を取得する
        let lastDay = new Date(dateData[0], dateData[1], 0);
        let lastDayOfMonth = lastDay.getDay();

        let day = 1;
        let str = "";
        while (true) {
            str += "<tr>";
            for (i = 0; i < 7; i++) {
                // 初週かつ初日より前の場合は、空白にする
                if (day == 1 && i < firstDayOfMonth) {
                    str += "<td></td>";
                    // 最終週かつ最終日より後の場合は、空白にする
                } else if (day >= lastDay.getDate() && lastDayOfMonth < i) {
                    str += "<td></td>";
                } else {
                    str += "<td>";
                    if (i == 0 || i == 6) {
                        str += "<a class='holiday'>" + day++ + "</a>";
                    } else {
                        str += day++;
                    }
                    str += "</td>";
                }
            }
            str += "</tr>";

            if (lastDay.getDate() + 1 == day) {
                break;
            }
        }
        $("#calendar").append(str);
    }

    // 先月を設定する
    $(document).on("click", "#btnPreviousMonth", function () {
        let dateData = $("#dateYearMonth").text().split(".");
        let preMonth = new Date(dateData[0], parseInt(dateData[1]) - 2, 1);
        $("#dateYearMonth").text(preMonth.getFullYear() + "." + (preMonth.getMonth() + 1));
        setDay();
    })

    // 翌月を設定する
    $(document).on("click", "#btnNextMonth", function () {
        let dateData = $("#dateYearMonth").text().split(".");
        let nextMonth = new Date(dateData[0], parseInt(dateData[1]), 1);
        $("#dateYearMonth").text(nextMonth.getFullYear() + "." + (nextMonth.getMonth() + 1));
        setDay();
    })

})
