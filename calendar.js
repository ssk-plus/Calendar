
jQuery(function ($) {

    $(document).ready(function () {
        setMonth();
        setDay();
    })

    // 今月を設定する
    function setMonth() {
        let date = new Date();
        $("#yearMonth").text(date.getFullYear() + "." + (date.getMonth() + 1));
    }

    // 年月に対応したカレンダーを設定する
    function setDay() {
        $("#areaWeek").nextAll().remove();

        let yearMonth = $("#yearMonth").text().split(".");
        // 今月を取得する
        let firstDay = new Date(yearMonth[0], parseInt(yearMonth[1]) - 1, 1);
        let firstDayOfWeek = firstDay.getDay();
        // 今月の末日を取得する
        let lastDay = new Date(yearMonth[0], yearMonth[1], 0);
        let lastDayOfWeek = lastDay.getDay();

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
            if (lastDay.getDate() + 1 <= day) {
                break;
            }
        }
        $("#calendar").append(weekStr);
    }

    // 先月を設定する
    $(document).on("click", "#btnPreviousMonth", function () {
        let yearMonth = $("#yearMonth").text().split(".");
        let preMonth = new Date(yearMonth[0], parseInt(yearMonth[1]) - 2, 1);
        $("#yearMonth").text(preMonth.getFullYear() + "." + (preMonth.getMonth() + 1));
        setDay();
    })

    // 翌月を設定する
    $(document).on("click", "#btnNextMonth", function () {
        let yearMonth = $("#yearMonth").text().split(".");
        let nextMonth = new Date(yearMonth[0], parseInt(yearMonth[1]), 1);
        $("#yearMonth").text(nextMonth.getFullYear() + "." + (nextMonth.getMonth() + 1));
        setDay();
    })

})
