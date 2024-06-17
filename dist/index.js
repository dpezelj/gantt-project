function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var ChevronRightIcon = _interopDefault(require('@mui/icons-material/ChevronRight'));
var ExpandMoreIcon = _interopDefault(require('@mui/icons-material/ExpandMore'));
var material = require('@mui/material');
var styles$a = require('@mui/material/styles');

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _createForOfIteratorHelperLoose(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (t) return (t = t.call(r)).next.bind(t);
  if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
    t && (r = t);
    var o = 0;
    return function () {
      return o >= r.length ? {
        done: !0
      } : {
        done: !1,
        value: r[o++]
      };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (e.indexOf(n) >= 0) continue;
    t[n] = r[n];
  }
  return t;
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

(function (ViewMode) {
  ViewMode["Hour"] = "Hour";
  ViewMode["QuarterDay"] = "Quarter Day";
  ViewMode["HalfDay"] = "Half Day";
  ViewMode["Day"] = "Day";
  ViewMode["Week"] = "Week";
  ViewMode["Month"] = "Month";
  ViewMode["Year"] = "Year";
})(exports.ViewMode || (exports.ViewMode = {}));

var intlDTCache = {};
var getCachedDateTimeFormat = function getCachedDateTimeFormat(locString, opts) {
  if (opts === void 0) {
    opts = {};
  }
  var key = JSON.stringify([locString, opts]);
  var dtf = intlDTCache[key];
  if (!dtf) {
    dtf = new Intl.DateTimeFormat(locString, opts);
    intlDTCache[key] = dtf;
  }
  return dtf;
};
var addToDate = function addToDate(date, quantity, scale) {
  var newDate = new Date(date.getFullYear() + (scale === "year" ? quantity : 0), date.getMonth() + (scale === "month" ? quantity : 0), date.getDate() + (scale === "day" ? quantity : 0), date.getHours() + (scale === "hour" ? quantity : 0), date.getMinutes() + (scale === "minute" ? quantity : 0), date.getSeconds() + (scale === "second" ? quantity : 0), date.getMilliseconds() + (scale === "millisecond" ? quantity : 0));
  return newDate;
};
var startOfDate = function startOfDate(date, scale) {
  var scores = ["millisecond", "second", "minute", "hour", "day", "month", "year"];
  var shouldReset = function shouldReset(_scale) {
    var maxScore = scores.indexOf(scale);
    return scores.indexOf(_scale) <= maxScore;
  };
  var newDate = new Date(date.getFullYear(), shouldReset("year") ? 0 : date.getMonth(), shouldReset("month") ? 1 : date.getDate(), shouldReset("day") ? 0 : date.getHours(), shouldReset("hour") ? 0 : date.getMinutes(), shouldReset("minute") ? 0 : date.getSeconds(), shouldReset("second") ? 0 : date.getMilliseconds());
  return newDate;
};
var ganttDateRange = function ganttDateRange(tasks, viewMode, preStepsCount) {
  var newStartDate = tasks[0].start;
  var newEndDate = tasks[0].start;
  for (var _iterator = _createForOfIteratorHelperLoose(tasks), _step; !(_step = _iterator()).done;) {
    var task = _step.value;
    if (task.start < newStartDate) {
      newStartDate = task.start;
    }
    if (task.end > newEndDate) {
      newEndDate = task.end;
    }
  }
  switch (viewMode) {
    case exports.ViewMode.Year:
      newStartDate = addToDate(newStartDate, -1, "year");
      newStartDate = startOfDate(newStartDate, "year");
      newEndDate = addToDate(newEndDate, 1, "year");
      newEndDate = startOfDate(newEndDate, "year");
      break;
    case exports.ViewMode.Month:
      newStartDate = addToDate(newStartDate, -1 * preStepsCount, "month");
      newStartDate = startOfDate(newStartDate, "month");
      newEndDate = addToDate(newEndDate, 1, "year");
      newEndDate = startOfDate(newEndDate, "year");
      break;
    case exports.ViewMode.Week:
      newStartDate = startOfDate(newStartDate, "day");
      newStartDate = addToDate(getMonday(newStartDate), -7 * preStepsCount, "day");
      newEndDate = startOfDate(newEndDate, "day");
      newEndDate = addToDate(newEndDate, 1.5, "month");
      break;
    case exports.ViewMode.Day:
      newStartDate = startOfDate(newStartDate, "day");
      newStartDate = addToDate(newStartDate, -1 * preStepsCount, "day");
      newEndDate = startOfDate(newEndDate, "day");
      newEndDate = addToDate(newEndDate, 19, "day");
      break;
    case exports.ViewMode.QuarterDay:
      newStartDate = startOfDate(newStartDate, "day");
      newStartDate = addToDate(newStartDate, -1 * preStepsCount, "day");
      newEndDate = startOfDate(newEndDate, "day");
      newEndDate = addToDate(newEndDate, 66, "hour");
      break;
    case exports.ViewMode.HalfDay:
      newStartDate = startOfDate(newStartDate, "day");
      newStartDate = addToDate(newStartDate, -1 * preStepsCount, "day");
      newEndDate = startOfDate(newEndDate, "day");
      newEndDate = addToDate(newEndDate, 108, "hour");
      break;
    case exports.ViewMode.Hour:
      newStartDate = startOfDate(newStartDate, "hour");
      newStartDate = addToDate(newStartDate, -1 * preStepsCount, "hour");
      newEndDate = startOfDate(newEndDate, "day");
      newEndDate = addToDate(newEndDate, 1, "day");
      break;
  }
  return [newStartDate, newEndDate];
};
var seedDates = function seedDates(startDate, endDate, viewMode) {
  var currentDate = new Date(startDate);
  var dates = [currentDate];
  while (currentDate < endDate) {
    switch (viewMode) {
      case exports.ViewMode.Year:
        currentDate = addToDate(currentDate, 1, "year");
        break;
      case exports.ViewMode.Month:
        currentDate = addToDate(currentDate, 1, "month");
        break;
      case exports.ViewMode.Week:
        currentDate = addToDate(currentDate, 7, "day");
        break;
      case exports.ViewMode.Day:
        currentDate = addToDate(currentDate, 1, "day");
        break;
      case exports.ViewMode.HalfDay:
        currentDate = addToDate(currentDate, 12, "hour");
        break;
      case exports.ViewMode.QuarterDay:
        currentDate = addToDate(currentDate, 6, "hour");
        break;
      case exports.ViewMode.Hour:
        currentDate = addToDate(currentDate, 1, "hour");
        break;
    }
    dates.push(currentDate);
  }
  return dates;
};
var getLocaleMonth = function getLocaleMonth(date, locale) {
  var bottomValue = getCachedDateTimeFormat(locale, {
    month: "long"
  }).format(date);
  bottomValue = bottomValue.replace(bottomValue[0], bottomValue[0].toLocaleUpperCase());
  return bottomValue;
};
var getLocalDayOfWeek = function getLocalDayOfWeek(date, locale, format) {
  var bottomValue = getCachedDateTimeFormat(locale, {
    weekday: format
  }).format(date);
  bottomValue = bottomValue.replace(bottomValue[0], bottomValue[0].toLocaleUpperCase());
  return bottomValue;
};
var getMonday = function getMonday(date) {
  var day = date.getDay();
  var diff = date.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(date.setDate(diff));
};
var getWeekNumberISO8601 = function getWeekNumberISO8601(date) {
  var tmpDate = new Date(date.valueOf());
  var dayNumber = (tmpDate.getDay() + 6) % 7;
  tmpDate.setDate(tmpDate.getDate() - dayNumber + 3);
  var firstThursday = tmpDate.valueOf();
  tmpDate.setMonth(0, 1);
  if (tmpDate.getDay() !== 4) {
    tmpDate.setMonth(0, 1 + (4 - tmpDate.getDay() + 7) % 7);
  }
  var weekNumber = (1 + Math.ceil((firstThursday - tmpDate.valueOf()) / 604800000)).toString();
  if (weekNumber.length === 1) {
    return "0" + weekNumber;
  } else {
    return weekNumber;
  }
};
var getDaysInMonth = function getDaysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
};

var styles = {"ganttTable":"_3_ygE","ganttTable_Header":"_1nBOt","ganttTable_HeaderSeparator":"_2eZzQ","ganttTable_HeaderItem":"_WuQ0f"};

var TaskListHeaderDefault = function TaskListHeaderDefault(_ref) {
  var headerHeight = _ref.headerHeight,
    fontFamily = _ref.fontFamily,
    fontSize = _ref.fontSize,
    rowWidth = _ref.rowWidth;
  return React__default.createElement("div", {
    className: styles.ganttTable,
    style: {
      fontFamily: fontFamily,
      fontSize: fontSize
    }
  }, React__default.createElement("div", {
    className: styles.ganttTable_Header,
    style: {
      height: headerHeight - 2
    }
  }, React__default.createElement("div", {
    className: styles.ganttTable_HeaderItem,
    style: {
      minWidth: rowWidth
    }
  }), React__default.createElement("div", {
    className: styles.ganttTable_HeaderSeparator,
    style: {
      height: headerHeight * 0.5,
      marginTop: headerHeight * 0.2
    }
  }), React__default.createElement("div", {
    className: styles.ganttTable_HeaderItem,
    style: {
      minWidth: rowWidth,
      textAlign: "center"
    }
  }), React__default.createElement("div", {
    className: styles.ganttTable_HeaderSeparator,
    style: {
      height: headerHeight * 0.5,
      marginTop: headerHeight * 0.25
    }
  }), React__default.createElement("div", {
    className: styles.ganttTable_HeaderItem,
    style: {
      minWidth: rowWidth
    }
  })));
};

var styles$1 = {"taskListWrapper":"_3ZbQT","taskListTableRow":"_34SS0","taskListCell":"_3lLk3","taskListNameWrapper":"_nI1Xw","taskListExpander":"_2QjE6","taskListEmptyExpander":"_2TfEi"};

var chipColors = {
  blue: {
    text: "#518EE0",
    background: "#DAF0FB"
  },
  yellow: {
    text: "#987901",
    background: "#FEEBA3"
  },
  green: {
    text: "#2D862D",
    background: "#ADE3AC"
  },
  red: {
    text: "#f06",
    background: "#FEA3C8"
  },
  purple: {
    text: "#306",
    background: "#B770FE"
  },
  brown: {
    text: "#930",
    background: "#FE9A70"
  },
  rose: {
    text: "#c3c",
    background: "#EBADEB"
  },
  kaki: {
    text: "#E78336",
    background: "#FCEFD4"
  },
  orange: {
    text: "#a13b08",
    background: "#fb9b72"
  }
};
var useProvideChipColors = function useProvideChipColors() {
  var resolveChipColor = function resolveChipColor(badgeColor, badgeTitle) {
    return badgeColor ? badgeTitle === "Setup" ? "#022D5F" : chipColors[badgeColor].background : undefined;
  };
  var resolveChipLabelColor = function resolveChipLabelColor(badgeColor, badgeTitle) {
    return badgeColor ? badgeTitle === "Setup" ? "white" : chipColors[badgeColor].text : undefined;
  };
  return {
    resolveChipColor: resolveChipColor,
    resolveChipLabelColor: resolveChipLabelColor
  };
};

var localeDateStringCache = {};
var toLocaleDateStringFactory = function toLocaleDateStringFactory(locale) {
  return function (date, dateTimeOptions) {
    var key = date.toString();
    var lds = localeDateStringCache[key];
    if (!lds) {
      lds = date.toLocaleDateString(locale, dateTimeOptions);
      localeDateStringCache[key] = lds;
    }
    return lds;
  };
};
function formatDate(inputDate) {
  var dateObject = new Date(inputDate);
  return dateObject.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit"
  });
}
var dateTimeOptions = {
  weekday: "short",
  year: "numeric",
  month: "long",
  day: "numeric"
};
var TaskListTableDefault = function TaskListTableDefault(_ref) {
  var rowHeight = _ref.rowHeight,
    rowWidth = _ref.rowWidth,
    tasks = _ref.tasks,
    fontFamily = _ref.fontFamily,
    fontSize = _ref.fontSize,
    locale = _ref.locale,
    onExpanderClick = _ref.onExpanderClick;
  var _useProvideChipColors = useProvideChipColors(),
    resolveChipColor = _useProvideChipColors.resolveChipColor,
    resolveChipLabelColor = _useProvideChipColors.resolveChipLabelColor;
  var toLocaleDateString = React.useMemo(function () {
    return toLocaleDateStringFactory(locale);
  }, [locale]);
  return React__default.createElement("div", {
    className: styles$1.taskListWrapper,
    style: {
      fontFamily: fontFamily,
      fontSize: fontSize
    }
  }, tasks.map(function (t) {
    var expanderSymbol = null;
    if (t.hideChildren === false) {
      expanderSymbol = React__default.createElement(ExpandMoreIcon, null);
    } else if (t.hideChildren === true) {
      expanderSymbol = React__default.createElement(ChevronRightIcon, null);
    }
    var match = t && t.id ? t.id.match(/\d+/) : null;
    var result = match ? match[0] : null;
    var projectId = result ? result : 0;
    return React__default.createElement("div", {
      className: styles$1.taskListTableRow,
      style: {
        height: rowHeight
      },
      key: t.id + "row"
    }, React__default.createElement("div", {
      className: styles$1.taskListCell,
      style: {
        minWidth: "305px",
        maxWidth: rowWidth
      },
      title: t.name
    }, React__default.createElement("div", {
      className: styles$1.taskListNameWrapper
    }, React__default.createElement("div", {
      className: expanderSymbol ? styles$1.taskListExpander : styles$1.taskListEmptyExpander,
      onClick: function onClick() {
        return onExpanderClick(t);
      }
    }, expanderSymbol), t.type === "project" ? React__default.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column"
      }
    }, React__default.createElement("div", {
      style: {
        fontWeight: "600",
        fontSize: "14px",
        maxHeight: "30px",
        lineHeight: 1,
        maxWidth: "350px",
        overflow: "hidden",
        wordWrap: "break-word",
        whiteSpace: "normal"
      }
    }, t.name), t.projectManager === "Undefined" ? React__default.createElement("a", {
      href: "/projects/" + projectId + "/personel",
      style: {
        fontSize: "12px",
        color: "rgb(2, 45, 95)",
        cursor: "pointer",
        textDecoration: "underline"
      }
    }, "Assign project manager") : React__default.createElement("div", {
      style: {
        fontSize: "12px",
        color: "rgb(2, 45, 95)"
      }
    }, t.projectManager)) : React__default.createElement("div", {
      style: {
        background: resolveChipColor(t.color, "Title chip"),
        color: resolveChipLabelColor(t.color, "Title chip"),
        padding: "0.3rem 1rem",
        borderRadius: "50px",
        fontSize: "12px",
        marginLeft: "14px"
      }
    }, t.name))), t.type !== "project" && React__default.createElement("div", {
      className: styles$1.taskListCell,
      style: {
        minWidth: rowWidth,
        maxWidth: rowWidth,
        width: "67%",
        textAlign: "center",
        color: "#747474",
        fontSize: "12px"
      }
    }, "\xA0", formatDate(toLocaleDateString(t.start, dateTimeOptions)).split("/").join(".") + " - " + formatDate(toLocaleDateString(t.end, dateTimeOptions)).split("/").join(".")));
  }));
};

var styles$2 = {"scroll":"_1eT-t"};

var VerticalScroll = function VerticalScroll(_ref) {
  var scroll = _ref.scroll,
    ganttHeight = _ref.ganttHeight,
    ganttFullHeight = _ref.ganttFullHeight,
    headerHeight = _ref.headerHeight,
    rtl = _ref.rtl,
    onScroll = _ref.onScroll;
  var scrollRef = React.useRef(null);
  React.useEffect(function () {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scroll;
    }
  }, [scroll]);
  return React__default.createElement("div", {
    style: {
      height: ganttHeight,
      marginTop: headerHeight,
      marginLeft: rtl ? "" : "-1rem"
    },
    className: styles$2.scroll,
    onScroll: onScroll,
    ref: scrollRef
  }, React__default.createElement("div", {
    style: {
      height: ganttFullHeight,
      width: 1
    }
  }));
};

var TaskList = function TaskList(_ref) {
  var headerHeight = _ref.headerHeight,
    fontFamily = _ref.fontFamily,
    fontSize = _ref.fontSize,
    rowWidth = _ref.rowWidth,
    rowHeight = _ref.rowHeight,
    scrollY = _ref.scrollY,
    tasks = _ref.tasks,
    selectedTask = _ref.selectedTask,
    setSelectedTask = _ref.setSelectedTask,
    onExpanderClick = _ref.onExpanderClick,
    locale = _ref.locale,
    ganttHeight = _ref.ganttHeight,
    taskListRef = _ref.taskListRef,
    horizontalContainerClass = _ref.horizontalContainerClass,
    TaskListHeader = _ref.TaskListHeader,
    TaskListTable = _ref.TaskListTable;
  var horizontalContainerRef = React.useRef(null);
  React.useEffect(function () {
    if (horizontalContainerRef.current) {
      horizontalContainerRef.current.scrollTop = scrollY;
    }
  }, [scrollY]);
  var headerProps = {
    headerHeight: headerHeight,
    fontFamily: fontFamily,
    fontSize: fontSize,
    rowWidth: rowWidth
  };
  var selectedTaskId = selectedTask ? selectedTask.id : "";
  var tableProps = {
    rowHeight: rowHeight,
    rowWidth: rowWidth,
    fontFamily: fontFamily,
    fontSize: fontSize,
    tasks: tasks,
    locale: locale,
    selectedTaskId: selectedTaskId,
    setSelectedTask: setSelectedTask,
    onExpanderClick: onExpanderClick
  };
  return React__default.createElement("div", {
    ref: taskListRef
  }, React__default.createElement(TaskListHeader, Object.assign({}, headerProps)), React__default.createElement("div", {
    ref: horizontalContainerRef,
    className: horizontalContainerClass,
    style: ganttHeight ? {
      height: ganttHeight
    } : {}
  }, React__default.createElement(TaskListTable, Object.assign({}, tableProps))));
};

var styles$3 = {"gridRow":"_2dZTy","gridRowLine":"_3rUKi","gridTick":"_RuwuK"};

var GridBody = function GridBody(_ref) {
  var tasks = _ref.tasks,
    dates = _ref.dates,
    rowHeight = _ref.rowHeight,
    svgWidth = _ref.svgWidth,
    columnWidth = _ref.columnWidth,
    todayColor = _ref.todayColor,
    rtl = _ref.rtl;
  var y = 0;
  var gridRows = [];
  var rowLines = [React__default.createElement("line", {
    key: "RowLineFirst",
    x: "0",
    y1: 0,
    x2: svgWidth,
    y2: 0,
    className: styles$3.gridRowLine
  })];
  for (var _iterator = _createForOfIteratorHelperLoose(tasks), _step; !(_step = _iterator()).done;) {
    var task = _step.value;
    gridRows.push(React__default.createElement("rect", {
      key: "Row" + task.id,
      x: "0",
      y: y,
      width: svgWidth,
      height: rowHeight,
      className: styles$3.gridRow
    }));
    rowLines.push(React__default.createElement("line", {
      key: "RowLine" + task.id,
      x: "0",
      y1: y + rowHeight,
      x2: svgWidth,
      y2: y + rowHeight,
      className: styles$3.gridRowLine
    }));
    y += rowHeight;
  }
  var now = new Date();
  var tickX = 0;
  var ticks = [];
  var today = React__default.createElement("rect", null);
  for (var i = 0; i < dates.length; i++) {
    var date = dates[i];
    ticks.push(React__default.createElement("line", {
      key: date.getTime(),
      x1: tickX,
      y1: 0,
      x2: tickX,
      y2: y,
      className: styles$3.gridTick
    }));
    if (i + 1 !== dates.length && date.getTime() < now.getTime() && dates[i + 1].getTime() >= now.getTime() || i !== 0 && i + 1 === dates.length && date.getTime() < now.getTime() && addToDate(date, date.getTime() - dates[i - 1].getTime(), "millisecond").getTime() >= now.getTime()) {
      today = React__default.createElement("rect", {
        x: tickX,
        y: 0,
        width: columnWidth,
        height: y,
        fill: todayColor
      });
    }
    if (rtl && i + 1 !== dates.length && date.getTime() >= now.getTime() && dates[i + 1].getTime() < now.getTime()) {
      today = React__default.createElement("rect", {
        x: tickX + columnWidth,
        y: 0,
        width: columnWidth,
        height: y,
        fill: todayColor
      });
    }
    tickX += columnWidth;
  }
  return React__default.createElement("g", {
    className: "gridBody"
  }, React__default.createElement("g", {
    className: "rows"
  }, gridRows), React__default.createElement("g", {
    className: "rowLines"
  }, rowLines), React__default.createElement("g", {
    className: "ticks"
  }, ticks), React__default.createElement("g", {
    className: "today"
  }, today));
};

var Grid = function Grid(props) {
  return React__default.createElement("g", {
    className: "grid"
  }, React__default.createElement(GridBody, Object.assign({}, props)));
};

var styles$4 = {"calendarBottomText":"_9w8d5","calendarMiddleText":"_2Nl1I","calendarTopTick":"_1rLuZ","calendarTopText":"_2q1Kt","calendarHeader":"_35nLX"};

var TopPartOfCalendar = function TopPartOfCalendar(_ref) {
  var value = _ref.value,
    x1Line = _ref.x1Line,
    y1Line = _ref.y1Line,
    y2Line = _ref.y2Line,
    xText = _ref.xText,
    yText = _ref.yText;
  return React__default.createElement("g", {
    className: "calendarTop"
  }, React__default.createElement("line", {
    x1: x1Line,
    y1: y1Line,
    x2: x1Line,
    y2: y2Line,
    className: styles$4.calendarTopTick,
    key: value + "line"
  }), React__default.createElement("text", {
    key: value + "text",
    y: yText,
    x: xText,
    className: styles$4.calendarTopText
  }, value));
};

var Calendar = function Calendar(_ref) {
  var dateSetup = _ref.dateSetup,
    locale = _ref.locale,
    viewMode = _ref.viewMode,
    rtl = _ref.rtl,
    headerHeight = _ref.headerHeight,
    columnWidth = _ref.columnWidth,
    fontFamily = _ref.fontFamily,
    fontSize = _ref.fontSize;
  var getCalendarValuesForYear = function getCalendarValuesForYear() {
    var topValues = [];
    var bottomValues = [];
    var topDefaultHeight = headerHeight * 0.5;
    for (var i = 0; i < dateSetup.dates.length; i++) {
      var date = dateSetup.dates[i];
      var bottomValue = date.getFullYear();
      bottomValues.push(React__default.createElement("text", {
        key: date.getFullYear(),
        y: headerHeight * 0.8,
        x: columnWidth * i + columnWidth * 0.5,
        className: styles$4.calendarBottomText
      }, bottomValue));
      if (i === 0 || date.getFullYear() !== dateSetup.dates[i - 1].getFullYear()) {
        var topValue = date.getFullYear().toString();
        var xText = void 0;
        if (rtl) {
          xText = (6 + i + date.getFullYear() + 1) * columnWidth;
        } else {
          xText = (6 + i - date.getFullYear()) * columnWidth;
        }
        topValues.push(React__default.createElement(TopPartOfCalendar, {
          key: topValue,
          value: topValue,
          x1Line: columnWidth * i,
          y1Line: 0,
          y2Line: headerHeight,
          xText: xText,
          yText: topDefaultHeight * 0.9
        }));
      }
    }
    return [topValues, bottomValues];
  };
  function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    var weekNo = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
    return weekNo;
  }
  var getCalendarValuesForMonth = function getCalendarValuesForMonth() {
    var topValues = [];
    var bottomValues = [];
    var topDefaultHeight = headerHeight * 0.5;
    for (var i = 0; i < dateSetup.dates.length; i++) {
      var date = dateSetup.dates[i];
      var bottomValue = getLocaleMonth(date, locale);
      bottomValues.push(React__default.createElement("text", {
        key: bottomValue + date.getFullYear(),
        y: headerHeight * 0.8,
        x: columnWidth * i + columnWidth * 0.5,
        className: styles$4.calendarBottomText
      }, bottomValue));
      if (i === 0 || date.getFullYear() !== dateSetup.dates[i - 1].getFullYear()) {
        var topValue = date.getFullYear().toString();
        var xText = void 0;
        if (rtl) {
          xText = (6 + i + date.getMonth() + 1) * columnWidth;
        } else {
          xText = (6 + i - date.getMonth()) * columnWidth;
        }
        topValues.push(React__default.createElement(TopPartOfCalendar, {
          key: topValue,
          value: topValue,
          x1Line: columnWidth * i,
          y1Line: 0,
          y2Line: topDefaultHeight,
          xText: xText,
          yText: topDefaultHeight * 0.9
        }));
      }
    }
    return [topValues, bottomValues];
  };
  var getCalendarValuesForWeek = function getCalendarValuesForWeek() {
    var topValues = [];
    var bottomValues = [];
    var weeksCount = 1;
    var topDefaultHeight = headerHeight * 0.5;
    var dates = dateSetup.dates;
    for (var i = dates.length - 1; i >= 0; i--) {
      var date = dates[i];
      var topValue = "";
      if (i === 0 || date.getMonth() !== dates[i - 1].getMonth()) {
        topValue = getLocaleMonth(date, locale) + ", " + date.getFullYear();
      }
      var bottomValue = "WH " + getWeekNumberISO8601(date);
      bottomValues.push(React__default.createElement("text", {
        key: date.getTime(),
        y: headerHeight * 0.8,
        x: columnWidth * (i + +rtl),
        className: styles$4.calendarBottomText
      }, bottomValue));
      if (topValue) {
        if (i !== dates.length - 1) {
          topValues.push(React__default.createElement(TopPartOfCalendar, {
            key: topValue,
            value: topValue,
            x1Line: columnWidth * i + weeksCount * columnWidth,
            y1Line: 0,
            y2Line: topDefaultHeight,
            xText: columnWidth * i + columnWidth * weeksCount * 0.5,
            yText: topDefaultHeight * 0.9
          }));
        }
        weeksCount = 0;
      }
      weeksCount++;
    }
    return [topValues, bottomValues];
  };
  var getCalendarValuesForDay = function getCalendarValuesForDay() {
    var topValues = [];
    var bottomValues = [];
    var middleValues = [];
    var topDefaultHeight = headerHeight * 0.5;
    var dates = dateSetup.dates;
    for (var i = 0; i < dates.length; i++) {
      var date = dates[i];
      var weekNumber = getWeekNumber(date);
      var middleValue = "WH " + weekNumber;
      if (date.getDay() === 1) {
        middleValues.push(React__default.createElement("text", {
          key: date.getTime() + "middle",
          y: headerHeight * 0.65,
          x: columnWidth * i + columnWidth * 0.55,
          className: styles$4.calendarMiddleText
        }, middleValue));
      }
      var bottomValue = date.toLocaleDateString(locale, {
        day: "2-digit",
        month: "2-digit"
      });
      bottomValues.push(React__default.createElement("text", {
        key: date.getTime(),
        y: headerHeight * 0.9,
        x: columnWidth * i + columnWidth * 0.5,
        className: styles$4.calendarBottomText
      }, bottomValue.split("/").join(".")));
      if (i + 1 !== dates.length && date.getMonth() !== dates[i + 1].getMonth()) {
        var topValue = getLocaleMonth(date, locale).toUpperCase() + ", " + date.getFullYear();
        topValues.push(React__default.createElement(TopPartOfCalendar, {
          key: topValue + date.getFullYear(),
          value: topValue,
          x1Line: columnWidth * (i + 1),
          y1Line: 0,
          y2Line: topDefaultHeight,
          xText: columnWidth * (i + 1) - getDaysInMonth(date.getMonth(), date.getFullYear()) * columnWidth * 0.5,
          yText: topDefaultHeight * 0.9
        }));
      }
    }
    return [topValues, bottomValues, middleValues];
  };
  var getCalendarValuesForPartOfDay = function getCalendarValuesForPartOfDay() {
    var topValues = [];
    var bottomValues = [];
    var ticks = viewMode === exports.ViewMode.HalfDay ? 2 : 4;
    var topDefaultHeight = headerHeight * 0.5;
    var dates = dateSetup.dates;
    for (var i = 0; i < dates.length; i++) {
      var date = dates[i];
      var bottomValue = getCachedDateTimeFormat(locale, {
        hour: "numeric"
      }).format(date);
      bottomValues.push(React__default.createElement("text", {
        key: date.getTime(),
        y: headerHeight * 0.8,
        x: columnWidth * (i + +rtl),
        className: styles$4.calendarBottomText,
        fontFamily: fontFamily
      }, bottomValue));
      if (i === 0 || date.getDate() !== dates[i - 1].getDate()) {
        var topValue = getLocalDayOfWeek(date, locale, "short") + ", " + date.getDate() + " " + getLocaleMonth(date, locale);
        topValues.push(React__default.createElement(TopPartOfCalendar, {
          key: topValue + date.getFullYear(),
          value: topValue,
          x1Line: columnWidth * i + ticks * columnWidth,
          y1Line: 0,
          y2Line: topDefaultHeight,
          xText: columnWidth * i + ticks * columnWidth * 0.5,
          yText: topDefaultHeight * 0.9
        }));
      }
    }
    return [topValues, bottomValues];
  };
  var getCalendarValuesForHour = function getCalendarValuesForHour() {
    var topValues = [];
    var bottomValues = [];
    var topDefaultHeight = headerHeight * 0.5;
    var dates = dateSetup.dates;
    for (var i = 0; i < dates.length; i++) {
      var date = dates[i];
      var bottomValue = getCachedDateTimeFormat(locale, {
        hour: "numeric"
      }).format(date);
      bottomValues.push(React__default.createElement("text", {
        key: date.getTime(),
        y: headerHeight * 0.8,
        x: columnWidth * (i + +rtl),
        className: styles$4.calendarBottomText,
        fontFamily: fontFamily
      }, bottomValue));
      if (i !== 0 && date.getDate() !== dates[i - 1].getDate()) {
        var displayDate = dates[i - 1];
        var topValue = getLocalDayOfWeek(displayDate, locale, "long") + ", " + displayDate.getDate() + " " + getLocaleMonth(displayDate, locale);
        var topPosition = (date.getHours() - 24) / 2;
        topValues.push(React__default.createElement(TopPartOfCalendar, {
          key: topValue + displayDate.getFullYear(),
          value: topValue,
          x1Line: columnWidth * i,
          y1Line: 0,
          y2Line: topDefaultHeight,
          xText: columnWidth * (i + topPosition),
          yText: topDefaultHeight * 0.9
        }));
      }
    }
    return [topValues, bottomValues];
  };
  var topValues = [];
  var bottomValues = [];
  var middleValues = [];
  switch (dateSetup.viewMode) {
    case exports.ViewMode.Year:
      var _getCalendarValuesFor = getCalendarValuesForYear();
      topValues = _getCalendarValuesFor[0];
      bottomValues = _getCalendarValuesFor[1];
      break;
    case exports.ViewMode.Month:
      var _getCalendarValuesFor2 = getCalendarValuesForMonth();
      topValues = _getCalendarValuesFor2[0];
      bottomValues = _getCalendarValuesFor2[1];
      break;
    case exports.ViewMode.Week:
      var _getCalendarValuesFor3 = getCalendarValuesForWeek();
      topValues = _getCalendarValuesFor3[0];
      bottomValues = _getCalendarValuesFor3[1];
      break;
    case exports.ViewMode.Day:
      var _getCalendarValuesFor4 = getCalendarValuesForDay();
      topValues = _getCalendarValuesFor4[0];
      bottomValues = _getCalendarValuesFor4[1];
      middleValues = _getCalendarValuesFor4[2];
      break;
    case exports.ViewMode.QuarterDay:
    case exports.ViewMode.HalfDay:
      var _getCalendarValuesFor5 = getCalendarValuesForPartOfDay();
      topValues = _getCalendarValuesFor5[0];
      bottomValues = _getCalendarValuesFor5[1];
      break;
    case exports.ViewMode.Hour:
      var _getCalendarValuesFor6 = getCalendarValuesForHour();
      topValues = _getCalendarValuesFor6[0];
      bottomValues = _getCalendarValuesFor6[1];
  }
  return React__default.createElement("g", {
    className: "calendar",
    fontSize: fontSize,
    fontFamily: fontFamily
  }, React__default.createElement("rect", {
    x: 0,
    y: 0,
    width: columnWidth * dateSetup.dates.length,
    height: headerHeight,
    className: styles$4.calendarHeader
  }), bottomValues, " ", middleValues, " ", topValues);
};

// A type of promise-like that resolves synchronously and supports only one observer

const _iteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))) : "@@iterator";

const _asyncIteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"))) : "@@asyncIterator";

// Asynchronously call a function and send errors to recovery continuation
function _catch(body, recover) {
	try {
		var result = body();
	} catch(e) {
		return recover(e);
	}
	if (result && result.then) {
		return result.then(void 0, recover);
	}
	return result;
}

var Arrow = function Arrow(_ref) {
  var taskFrom = _ref.taskFrom,
    taskTo = _ref.taskTo,
    rowHeight = _ref.rowHeight,
    taskHeight = _ref.taskHeight,
    arrowIndent = _ref.arrowIndent,
    rtl = _ref.rtl;
  var path;
  var trianglePoints;
  if (rtl) {
    var _drownPathAndTriangle = drownPathAndTriangleRTL(taskFrom, taskTo, rowHeight, taskHeight, arrowIndent);
    path = _drownPathAndTriangle[0];
    trianglePoints = _drownPathAndTriangle[1];
  } else {
    var _drownPathAndTriangle2 = drownPathAndTriangle(taskFrom, taskTo, rowHeight, taskHeight, arrowIndent);
    path = _drownPathAndTriangle2[0];
    trianglePoints = _drownPathAndTriangle2[1];
  }
  return React__default.createElement("g", {
    className: "arrow"
  }, React__default.createElement("path", {
    strokeWidth: "1.5",
    d: path,
    fill: "none"
  }), React__default.createElement("polygon", {
    points: trianglePoints
  }));
};
var drownPathAndTriangle = function drownPathAndTriangle(taskFrom, taskTo, rowHeight, taskHeight, arrowIndent) {
  var indexCompare = taskFrom.index > taskTo.index ? -1 : 1;
  var taskToEndPosition = taskTo.y + taskHeight / 2;
  var taskFromEndPosition = taskFrom.x2 + arrowIndent * 2;
  var taskFromHorizontalOffsetValue = taskFromEndPosition < taskTo.x1 ? "" : "H " + (taskTo.x1 - arrowIndent);
  var taskToHorizontalOffsetValue = taskFromEndPosition > taskTo.x1 ? arrowIndent : taskTo.x1 - taskFrom.x2 - arrowIndent;
  var path = "M " + taskFrom.x2 + " " + (taskFrom.y + taskHeight / 2) + " \n  h " + arrowIndent + " \n  v " + indexCompare * rowHeight / 2 + " \n  " + taskFromHorizontalOffsetValue + "\n  V " + taskToEndPosition + " \n  h " + taskToHorizontalOffsetValue;
  var trianglePoints = taskTo.x1 + "," + taskToEndPosition + " \n  " + (taskTo.x1 - 5) + "," + (taskToEndPosition - 5) + " \n  " + (taskTo.x1 - 5) + "," + (taskToEndPosition + 5);
  return [path, trianglePoints];
};
var drownPathAndTriangleRTL = function drownPathAndTriangleRTL(taskFrom, taskTo, rowHeight, taskHeight, arrowIndent) {
  var indexCompare = taskFrom.index > taskTo.index ? -1 : 1;
  var taskToEndPosition = taskTo.y + taskHeight / 2;
  var taskFromEndPosition = taskFrom.x1 - arrowIndent * 2;
  var taskFromHorizontalOffsetValue = taskFromEndPosition > taskTo.x2 ? "" : "H " + (taskTo.x2 + arrowIndent);
  var taskToHorizontalOffsetValue = taskFromEndPosition < taskTo.x2 ? -arrowIndent : taskTo.x2 - taskFrom.x1 + arrowIndent;
  var path = "M " + taskFrom.x1 + " " + (taskFrom.y + taskHeight / 2) + " \n  h " + -arrowIndent + " \n  v " + indexCompare * rowHeight / 2 + " \n  " + taskFromHorizontalOffsetValue + "\n  V " + taskToEndPosition + " \n  h " + taskToHorizontalOffsetValue;
  var trianglePoints = taskTo.x2 + "," + taskToEndPosition + " \n  " + (taskTo.x2 + 5) + "," + (taskToEndPosition + 5) + " \n  " + (taskTo.x2 + 5) + "," + (taskToEndPosition - 5);
  return [path, trianglePoints];
};

var styles$5 = {"relationLine":"_3QRTF"};

var RelationLine = function RelationLine(_ref) {
  var x1 = _ref.x1,
    x2 = _ref.x2,
    y1 = _ref.y1,
    y2 = _ref.y2;
  return React__default.createElement("line", {
    x1: x1,
    x2: x2,
    y1: y1,
    y2: y2,
    className: styles$5.relationLine
  });
};

var getRelationCircleByCoordinates = function getRelationCircleByCoordinates(svgP, tasks, taskHalfHeight, relationCircleOffset, relationCircleRadius, rtl) {
  var x = svgP.x,
    y = svgP.y;
  for (var i = 0, l = tasks.length; i < l; ++i) {
    var task = tasks[i];
    if (y >= task.y + taskHalfHeight - relationCircleRadius && y <= task.y + taskHalfHeight + relationCircleRadius) {
      if (x >= task.x1 - relationCircleOffset - relationCircleRadius && y <= task.x1 - relationCircleOffset + relationCircleRadius) {
        return [task, rtl ? "endOfTask" : "startOfTask"];
      }
      if (x >= task.x2 + relationCircleOffset - relationCircleRadius && y <= task.x2 + relationCircleOffset + relationCircleRadius) {
        return [task, rtl ? "startOfTask" : "endOfTask"];
      }
    }
  }
  return null;
};

var convertToBarTasks = function convertToBarTasks(tasks, dates, columnWidth, rowHeight, taskHeight, barCornerRadius, handleWidth, rtl, barProgressColor, barProgressSelectedColor, barBackgroundColor, barBackgroundSelectedColor, projectProgressColor, projectProgressSelectedColor, projectBackgroundColor, projectBackgroundSelectedColor, milestoneBackgroundColor, milestoneBackgroundSelectedColor) {
  var barTasks = tasks.map(function (t, i) {
    return convertToBarTask(t, i, dates, columnWidth, rowHeight, taskHeight, barCornerRadius, handleWidth, rtl, barProgressColor, barProgressSelectedColor, barBackgroundColor, barBackgroundSelectedColor, projectProgressColor, projectProgressSelectedColor, projectBackgroundColor, projectBackgroundSelectedColor, milestoneBackgroundColor, milestoneBackgroundSelectedColor);
  });
  console.log("BARTASKS", barTasks);
  barTasks = barTasks.map(function (task) {
    var dependencies = task.dependencies || [];
    var _loop = function _loop(j) {
      var dependence = barTasks.findIndex(function (value) {
        return value.id === dependencies[j];
      });
      if (dependence !== -1) {
        barTasks[dependence].barChildren.push(task);
        task.offset = task.x1 - barTasks[1].x1;
      } else {
        task.offset = 0;
      }
    };
    for (var j = 0; j < dependencies.length; j++) {
      _loop(j);
    }
    return task;
  });
  return barTasks;
};
var convertToBarTask = function convertToBarTask(task, index, dates, columnWidth, rowHeight, taskHeight, barCornerRadius, handleWidth, rtl, barProgressColor, barProgressSelectedColor, barBackgroundColor, barBackgroundSelectedColor, projectProgressColor, projectProgressSelectedColor, projectBackgroundColor, projectBackgroundSelectedColor, milestoneBackgroundColor, milestoneBackgroundSelectedColor) {
  var barTask;
  switch (task.type) {
    case "milestone":
      barTask = convertToMilestone(task, index, dates, columnWidth, rowHeight, taskHeight, barCornerRadius, handleWidth, milestoneBackgroundColor, milestoneBackgroundSelectedColor);
      break;
    case "project":
      barTask = convertToBar(task, index, dates, columnWidth, rowHeight, taskHeight, barCornerRadius, handleWidth, rtl, projectProgressColor, projectProgressSelectedColor, projectBackgroundColor, projectBackgroundSelectedColor);
      break;
    default:
      barTask = convertToBar(task, index, dates, columnWidth, rowHeight, taskHeight, barCornerRadius, handleWidth, rtl, barProgressColor, barProgressSelectedColor, barBackgroundColor, barBackgroundSelectedColor);
      break;
  }
  return barTask;
};
var convertToBar = function convertToBar(task, index, dates, columnWidth, rowHeight, taskHeight, barCornerRadius, handleWidth, rtl, barProgressColor, barProgressSelectedColor, barBackgroundColor, barBackgroundSelectedColor) {
  var x1;
  var x2;
  if (rtl) {
    x2 = taskXCoordinateRTL(task.start, dates, columnWidth);
    x1 = taskXCoordinateRTL(task.end, dates, columnWidth);
  } else {
    x1 = taskXCoordinate(task.start, dates, columnWidth);
    x2 = taskXCoordinate(task.end, dates, columnWidth);
  }
  var typeInternal = task.type;
  if (typeInternal === "task" && x2 - x1 < handleWidth * 2) {
    typeInternal = "smalltask";
    x2 = x1 + handleWidth * 2;
  }
  var _progressWithByParams = progressWithByParams(x1, x2, task.progress, rtl),
    progressWidth = _progressWithByParams[0],
    progressX = _progressWithByParams[1];
  var y = taskYCoordinate(index, rowHeight, taskHeight);
  var hideChildren = task.type === "project" ? task.hideChildren : undefined;
  var styles = _extends({
    backgroundColor: barBackgroundColor,
    backgroundSelectedColor: barBackgroundSelectedColor,
    progressColor: barProgressColor,
    progressSelectedColor: barProgressSelectedColor
  }, task.styles);
  return _extends({}, task, {
    typeInternal: typeInternal,
    x1: x1,
    x2: x2,
    y: y,
    index: index,
    progressX: progressX,
    progressWidth: progressWidth,
    barCornerRadius: barCornerRadius,
    handleWidth: handleWidth,
    hideChildren: hideChildren,
    height: taskHeight,
    barChildren: [],
    styles: styles
  });
};
var convertToMilestone = function convertToMilestone(task, index, dates, columnWidth, rowHeight, taskHeight, barCornerRadius, handleWidth, milestoneBackgroundColor, milestoneBackgroundSelectedColor) {
  var x = taskXCoordinate(task.start, dates, columnWidth);
  var y = taskYCoordinate(index, rowHeight, taskHeight);
  var x1 = x - taskHeight * 0.5;
  var x2 = x + taskHeight * 0.5;
  var rotatedHeight = taskHeight / 1.414;
  var styles = _extends({
    backgroundColor: milestoneBackgroundColor,
    backgroundSelectedColor: milestoneBackgroundSelectedColor,
    progressColor: "",
    progressSelectedColor: ""
  }, task.styles);
  return _extends({}, task, {
    end: task.start,
    x1: x1,
    x2: x2,
    y: y,
    index: index,
    progressX: 0,
    progressWidth: 0,
    barCornerRadius: barCornerRadius,
    handleWidth: handleWidth,
    typeInternal: task.type,
    progress: 0,
    height: rotatedHeight,
    hideChildren: undefined,
    barChildren: [],
    styles: styles
  });
};
var taskXCoordinate = function taskXCoordinate(xDate, dates, columnWidth) {
  var index = dates.findIndex(function (d) {
    return d.getTime() >= xDate.getTime();
  }) - 1;
  var remainderMillis = xDate.getTime() - dates[index].getTime();
  var percentOfInterval = remainderMillis / (dates[index + 1].getTime() - dates[index].getTime());
  var x = index * columnWidth + percentOfInterval * columnWidth;
  return x;
};
var taskXCoordinateRTL = function taskXCoordinateRTL(xDate, dates, columnWidth) {
  var x = taskXCoordinate(xDate, dates, columnWidth);
  x += columnWidth;
  return x;
};
var taskYCoordinate = function taskYCoordinate(index, rowHeight, taskHeight) {
  var y = index * rowHeight + (rowHeight - taskHeight) / 2;
  return y;
};
var progressWithByParams = function progressWithByParams(taskX1, taskX2, progress, rtl) {
  var progressWidth = (taskX2 - taskX1) * progress * 0.01;
  var progressX;
  if (rtl) {
    progressX = taskX2 - progressWidth;
  } else {
    progressX = taskX1;
  }
  return [progressWidth, progressX];
};
var progressByX = function progressByX(x, task) {
  if (x >= task.x2) return 100;else if (x <= task.x1) return 0;else {
    var barWidth = task.x2 - task.x1;
    var progressPercent = Math.round((x - task.x1) * 100 / barWidth);
    return progressPercent;
  }
};
var progressByXRTL = function progressByXRTL(x, task) {
  if (x >= task.x2) return 0;else if (x <= task.x1) return 100;else {
    var barWidth = task.x2 - task.x1;
    var progressPercent = Math.round((task.x2 - x) * 100 / barWidth);
    return progressPercent;
  }
};
var getProgressPoint = function getProgressPoint(progressX, taskY, taskHeight) {
  var point = [progressX - 5, taskY + taskHeight, progressX + 5, taskY + taskHeight, progressX, taskY + taskHeight - 8.66];
  return point.join(",");
};
var startByX = function startByX(x, xStep, task) {
  if (x >= task.x2 - task.handleWidth * 2) {
    x = task.x2 - task.handleWidth * 2;
  }
  var steps = Math.round((x - task.x1) / xStep);
  var additionalXValue = steps * xStep;
  var newX = task.x1 + additionalXValue;
  return newX;
};
var endByX = function endByX(x, xStep, task) {
  if (x <= task.x1 + task.handleWidth * 2) {
    x = task.x1 + task.handleWidth * 2;
  }
  var steps = Math.round((x - task.x2) / xStep);
  var additionalXValue = steps * xStep;
  var newX = task.x2 + additionalXValue;
  return newX;
};
var moveByX = function moveByX(x, xStep, task, prevTask) {
  var steps = Math.round((x - task.x1) / xStep);
  var additionalXValue = steps * xStep;
  var newX1 = task.x1 + additionalXValue;
  newX1 = prevTask ? newX1 < prevTask.x2 ? prevTask.x2 : newX1 : newX1;
  var newX2 = newX1 + task.x2 - task.x1;
  return [newX1, newX2];
};
var moveByXForEach = function moveByXForEach(task, newMoveX1, selectedTask) {
  var taskOffset = task.offset || 0;
  var selectedTaskOffset = selectedTask.offset || 0;
  var newTaskOffset = taskOffset - selectedTaskOffset;
  var newX1Test = newMoveX1 + newTaskOffset;
  var newX2Test = newX1Test + task.x2 - task.x1;
  return {
    newX1Test: newX1Test,
    newX2Test: newX2Test
  };
};
var dateByX = function dateByX(x, taskX, taskDate, xStep, timeStep) {
  var newDate = new Date((x - taskX) / xStep * timeStep + taskDate.getTime());
  newDate = new Date(newDate.getTime() + (newDate.getTimezoneOffset() - taskDate.getTimezoneOffset()) * 60000);
  return newDate;
};
var handleTaskBySVGMouseEvent = function handleTaskBySVGMouseEvent(svgX, action, selectedTask, tasks, xStep, timeStep, initEventX1Delta, rtl) {
  var result;
  switch (selectedTask.type) {
    case "milestone":
      result = handleTaskBySVGMouseEventForMilestone(svgX, action, selectedTask, tasks, xStep, timeStep, initEventX1Delta);
      break;
    default:
      console.log("MOVING");
      result = handleTaskBySVGMouseEventForBar(svgX, action, selectedTask, tasks, xStep, timeStep, initEventX1Delta, rtl);
      break;
  }
  return result;
};
var handleTaskBySVGMouseEventForBar = function handleTaskBySVGMouseEventForBar(svgX, action, selectedTask, tasks, xStep, timeStep, initEventX1Delta, rtl) {
  var changedTasks = [];
  var changedTask = _extends({}, selectedTask);
  var isChanged = false;
  switch (action) {
    case "progress":
      if (rtl) {
        changedTask.progress = progressByXRTL(svgX, selectedTask);
      } else {
        changedTask.progress = progressByX(svgX, selectedTask);
      }
      isChanged = changedTask.progress !== selectedTask.progress;
      if (isChanged) {
        var _progressWithByParams2 = progressWithByParams(changedTask.x1, changedTask.x2, changedTask.progress, rtl),
          progressWidth = _progressWithByParams2[0],
          progressX = _progressWithByParams2[1];
        changedTask.progressWidth = progressWidth;
        changedTask.progressX = progressX;
      }
      break;
    case "start":
      {
        var newX1 = startByX(svgX, xStep, selectedTask);
        changedTask.x1 = newX1;
        isChanged = changedTask.x1 !== selectedTask.x1;
        if (isChanged) {
          if (rtl) {
            changedTask.end = dateByX(newX1, selectedTask.x1, selectedTask.end, xStep, timeStep);
          } else {
            changedTask.start = dateByX(newX1, selectedTask.x1, selectedTask.start, xStep, timeStep);
          }
          var _progressWithByParams3 = progressWithByParams(changedTask.x1, changedTask.x2, changedTask.progress, rtl),
            _progressWidth = _progressWithByParams3[0],
            _progressX = _progressWithByParams3[1];
          changedTask.progressWidth = _progressWidth;
          changedTask.progressX = _progressX;
        }
        break;
      }
    case "end":
      {
        var newX2 = endByX(svgX, xStep, selectedTask);
        changedTask.x2 = newX2;
        isChanged = changedTask.x2 !== selectedTask.x2;
        if (isChanged) {
          if (rtl) {
            changedTask.start = dateByX(newX2, selectedTask.x2, selectedTask.start, xStep, timeStep);
          } else {
            changedTask.end = dateByX(newX2, selectedTask.x2, selectedTask.end, xStep, timeStep);
          }
          var _progressWithByParams4 = progressWithByParams(changedTask.x1, changedTask.x2, changedTask.progress, rtl),
            _progressWidth2 = _progressWithByParams4[0],
            _progressX2 = _progressWithByParams4[1];
          changedTask.progressWidth = _progressWidth2;
          changedTask.progressX = _progressX2;
        }
        break;
      }
    case "move":
      {
        var prevDependentTask = tasks.filter(function (item) {
          var _selectedTask$depende;
          return (_selectedTask$depende = selectedTask.dependencies) === null || _selectedTask$depende === void 0 ? void 0 : _selectedTask$depende.includes(item.id);
        }).pop();
        var _moveByX = moveByX(svgX - initEventX1Delta, xStep, selectedTask, prevDependentTask),
          newMoveX1 = _moveByX[0],
          newMoveX2 = _moveByX[1];
        isChanged = newMoveX1 !== selectedTask.x1;
        if (isChanged) {
          console.log("IZVODI SE");
          changedTask.start = dateByX(newMoveX1, selectedTask.x1, selectedTask.start, xStep, timeStep);
          changedTask.end = dateByX(newMoveX2, selectedTask.x2, selectedTask.end, xStep, timeStep);
          changedTask.x1 = newMoveX1;
          changedTask.x2 = newMoveX2;
          var _progressWithByParams5 = progressWithByParams(changedTask.x1, changedTask.x2, changedTask.progress, rtl),
            _progressWidth3 = _progressWithByParams5[0],
            _progressX3 = _progressWithByParams5[1];
          changedTask.progressWidth = _progressWidth3;
          changedTask.progressX = _progressX3;
          console.log("IZVODI SE", changedTask);
          var childrenIds = getAllBarChildrenIds(changedTask);
          tasks.filter(function (t) {
            return childrenIds.includes(t.id);
          }).map(function (task) {
            var _moveByXForEach = moveByXForEach(task, newMoveX1, selectedTask),
              newX1Test = _moveByXForEach.newX1Test,
              newX2Test = _moveByXForEach.newX2Test;
            task.start = dateByX(newX1Test, task.x1, task.start, xStep, timeStep);
            task.end = dateByX(newX2Test, task.x2, task.end, xStep, timeStep);
            task.x1 = newX1Test;
            task.x2 = newX2Test;
            var _progressWithByParams6 = progressWithByParams(task.x1, task.x2, task.progress, rtl),
              progressWidth = _progressWithByParams6[0],
              progressX = _progressWithByParams6[1];
            task.progressWidth = progressWidth;
            task.progressX = progressX;
            changedTasks.push(task);
            return task;
          });
        }
      }
  }
  console.log("CODE 1", changedTasks);
  return {
    isChanged: isChanged,
    changedTask: changedTask,
    changedTasks: changedTasks
  };
};
var handleTaskBySVGMouseEventForMilestone = function handleTaskBySVGMouseEventForMilestone(svgX, action, selectedTask, tasks, xStep, timeStep, initEventX1Delta) {
  var changedTasks = [];
  var changedTask = _extends({}, selectedTask);
  var isChanged = false;
  switch (action) {
    case "move":
      {
        var prevTaskIndex = tasks.findIndex(function (task) {
          return task.id === selectedTask.id;
        }) - 1;
        var prevTask = tasks[prevTaskIndex];
        var _moveByX2 = moveByX(svgX - initEventX1Delta, xStep, selectedTask, prevTask),
          newMoveX1 = _moveByX2[0],
          newMoveX2 = _moveByX2[1];
        isChanged = newMoveX1 !== selectedTask.x1;
        if (isChanged) {
          changedTask.start = dateByX(newMoveX1, selectedTask.x1, selectedTask.start, xStep, timeStep);
          changedTask.end = changedTask.start;
          changedTask.x1 = newMoveX1;
          changedTask.x2 = newMoveX2;
        }
        break;
      }
  }
  return {
    isChanged: isChanged,
    changedTask: changedTask,
    changedTasks: changedTasks
  };
};
function getAllBarChildrenIds(obj) {
  var ids = [];
  if (!ids.includes(obj.id)) {
    ids.push(obj.id);
  }
  if (obj.barChildren && obj.barChildren.length > 0) {
    for (var _iterator = _createForOfIteratorHelperLoose(obj.barChildren), _step; !(_step = _iterator()).done;) {
      var child = _step.value;
      if (!ids.includes(child.id)) {
        ids.push(child.id);
      }
      ids = ids.concat(getAllBarChildrenIds(child));
    }
  }
  return ids;
}

function isKeyboardEvent(event) {
  return event.key !== undefined;
}
function removeHiddenTasks(tasks) {
  var groupedTasks = tasks.filter(function (t) {
    return t.hideChildren && t.type === "project";
  });
  if (groupedTasks.length > 0) {
    var _loop = function _loop() {
      var groupedTask = groupedTasks[i];
      var children = getChildren(tasks, groupedTask);
      tasks = tasks.filter(function (t) {
        return children.indexOf(t) === -1;
      });
    };
    for (var i = 0; groupedTasks.length > i; i++) {
      _loop();
    }
  }
  return tasks;
}
function getChildren(taskList, task) {
  var tasks = [];
  if (task.type !== "project") {
    tasks = taskList.filter(function (t) {
      return t.dependencies && t.dependencies.indexOf(task.id) !== -1;
    });
  } else {
    tasks = taskList.filter(function (t) {
      return t.project && t.project === task.id;
    });
  }
  var taskChildren = [];
  tasks.forEach(function (t) {
    taskChildren.push.apply(taskChildren, getChildren(taskList, t));
  });
  tasks = tasks.concat(tasks, taskChildren);
  return tasks;
}
var sortTasks = function sortTasks(taskA, taskB) {
  var orderA = taskA.displayOrder || Number.MAX_VALUE;
  var orderB = taskB.displayOrder || Number.MAX_VALUE;
  if (orderA > orderB) {
    return 1;
  } else if (orderA < orderB) {
    return -1;
  } else {
    return 0;
  }
};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var classnames = createCommonjsModule(function (module) {
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
/* global define */

(function () {

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = '';

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (arg) {
				classes = appendClass(classes, parseValue(arg));
			}
		}

		return classes;
	}

	function parseValue (arg) {
		if (typeof arg === 'string' || typeof arg === 'number') {
			return arg;
		}

		if (typeof arg !== 'object') {
			return '';
		}

		if (Array.isArray(arg)) {
			return classNames.apply(null, arg);
		}

		if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
			return arg.toString();
		}

		var classes = '';

		for (var key in arg) {
			if (hasOwn.call(arg, key) && arg[key]) {
				classes = appendClass(classes, key);
			}
		}

		return classes;
	}

	function appendClass (value, newClass) {
		if (!newClass) {
			return value;
		}
	
		if (value) {
			return value + ' ' + newClass;
		}
	
		return value + newClass;
	}

	if ( module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else {
		window.classNames = classNames;
	}
}());
});

var styles$6 = {"barWrapper":"_KxSXS","barHandle":"_3w_5u","barBackground":"_31ERP"};

var BarDisplay = function BarDisplay(_ref) {
  var x = _ref.x,
    y = _ref.y,
    width = _ref.width,
    height = _ref.height,
    isSelected = _ref.isSelected,
    progressX = _ref.progressX,
    progressWidth = _ref.progressWidth,
    barCornerRadius = _ref.barCornerRadius,
    styles = _ref.styles,
    onMouseDown = _ref.onMouseDown;
  return React__default.createElement("g", {
    onMouseDown: onMouseDown
  }, React__default.createElement("rect", {
    x: x,
    width: width,
    y: y,
    height: height,
    ry: barCornerRadius,
    rx: barCornerRadius,
    fill: styles.backgroundSelectedColor,
    className: styles$6.barBackground
  }), React__default.createElement("rect", {
    x: progressX,
    width: progressWidth,
    y: y + 0.2,
    height: height - 0.5,
    ry: barCornerRadius,
    rx: barCornerRadius,
    fill: isSelected ? styles.backgroundColor : styles.backgroundColor
  }));
};

var BarDateHandle = function BarDateHandle(_ref) {
  var x = _ref.x,
    y = _ref.y,
    width = _ref.width,
    height = _ref.height,
    barCornerRadius = _ref.barCornerRadius,
    onMouseDown = _ref.onMouseDown;
  return React__default.createElement("rect", {
    x: x,
    y: y,
    width: width,
    height: height,
    className: styles$6.barHandle,
    ry: barCornerRadius,
    rx: barCornerRadius,
    onMouseDown: onMouseDown
  });
};

var stylesRelationHandle = {"barRelationHandleWrapper":"_2yAoi","barRelationHandle":"_E5hrM","barRelationHandle_drawMode":"_30bh6"};

var BarRelationHandle = function BarRelationHandle(_ref) {
  var _cx;
  var x = _ref.x,
    y = _ref.y,
    radius = _ref.radius,
    isRelationDrawMode = _ref.isRelationDrawMode,
    onMouseDown = _ref.onMouseDown;
  return React__default.createElement("circle", {
    cx: x,
    cy: y,
    r: radius,
    className: classnames(stylesRelationHandle.barRelationHandle, (_cx = {}, _cx[stylesRelationHandle.barRelationHandle_drawMode] = isRelationDrawMode, _cx)),
    onMouseDown: onMouseDown,
    "data-draw-mode": isRelationDrawMode
  });
};

var BarProgressHandle = function BarProgressHandle(_ref) {
  var progressPoint = _ref.progressPoint,
    onMouseDown = _ref.onMouseDown;
  return React__default.createElement("polygon", {
    className: styles$6.barHandle,
    points: progressPoint,
    onMouseDown: onMouseDown
  });
};

var projectColors = {
  red: {
    bg: "#E52713",
    fg: "#F5A9A1"
  },
  green: {
    bg: "#2D862D",
    fg: "#ADE3AC"
  },
  yellow: {
    bg: "#F2C94C",
    fg: "#FAE9B7"
  }
};

var _excluded = ["className"];
var HtmlTooltip = styles$a.styled(function (_ref) {
  var className = _ref.className,
    props = _objectWithoutPropertiesLoose(_ref, _excluded);
  return React__default.createElement(material.Tooltip, Object.assign({}, props, {
    classes: {
      popper: className
    }
  }));
})(function () {
  var _ref2;
  return _ref2 = {}, _ref2["& ." + material.tooltipClasses.tooltip] = {
    color: "#666",
    background: "#fff",
    padding: "1rem",
    borderRadius: "1rem",
    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)"
  }, _ref2;
});
var Bar = function Bar(_ref3) {
  var task = _ref3.task,
    taskHalfHeight = _ref3.taskHalfHeight,
    relationCircleOffset = _ref3.relationCircleOffset,
    relationCircleRadius = _ref3.relationCircleRadius,
    isProgressChangeable = _ref3.isProgressChangeable,
    isDateChangeable = _ref3.isDateChangeable,
    isRelationChangeable = _ref3.isRelationChangeable,
    isRelationDrawMode = _ref3.isRelationDrawMode,
    rtl = _ref3.rtl,
    onEventStart = _ref3.onEventStart,
    onRelationStart = _ref3.onRelationStart,
    isSelected = _ref3.isSelected;
  var x = false;
  var _useProvideChipColors = useProvideChipColors(),
    resolveChipColor = _useProvideChipColors.resolveChipColor,
    resolveChipLabelColor = _useProvideChipColors.resolveChipLabelColor;
  var onLeftRelationTriggerMouseDown = React.useCallback(function () {
    onRelationStart(rtl ? "endOfTask" : "startOfTask", task);
  }, [onRelationStart, rtl, task]);
  var onRightRelationTriggerMouseDown = React.useCallback(function () {
    onRelationStart(rtl ? "startOfTask" : "endOfTask", task);
  }, [onRelationStart, rtl, task]);
  var progressPoint = getProgressPoint(+!rtl * task.progressWidth + task.progressX, task.y, task.height);
  var handleHeight = task.height - 2;
  var taskStyle = _extends({}, task.styles, {
    backgroundColor: projectColors[task.progressColor].bg || "#ededed",
    backgroundSelectedColor: projectColors[task.progressColor].fg || "#ededed"
  });
  return React__default.createElement(HtmlTooltip, {
    placement: "bottom-start",
    followCursor: true,
    title: React__default.createElement(React__default.Fragment, null, React__default.createElement(material.Typography, {
      style: {
        textAlign: "center",
        fontSize: "14px",
        borderRadius: "50px",
        background: resolveChipColor(task.color, "Title chip"),
        color: resolveChipLabelColor(task.color, "Title chip"),
        padding: "0.3rem 1rem"
      }
    }, React__default.createElement("div", {
      style: {
        margin: "auto"
      }
    }, task.name)), React__default.createElement("pre", {
      className: styles$6.tooltipDefaultContainerParagraph
    }, task.start.getDate() + "." + (task.start.getMonth() + 1) + "." + task.start.getFullYear() + " - " + task.end.getDate() + "." + (task.end.getMonth() + 1) + "." + task.end.getFullYear()), task.end.getTime() - task.start.getTime() !== 0 && React__default.createElement("p", {
      className: styles$6.tooltipDefaultContainerParagraph
    }, "Duration: " + ~~((task.end.getTime() - task.start.getTime()) / (1000 * 60 * 60 * 24)) + " day(s)"), React__default.createElement("p", {
      className: styles$6.tooltipDefaultContainerParagraph
    }, !!task.progress && "Progress: " + task.progress + " %"))
  }, React__default.createElement("g", {
    className: classnames(styles$6.barWrapper, stylesRelationHandle.barRelationHandleWrapper),
    tabIndex: 0
  }, React__default.createElement(BarDisplay, {
    x: task.x1,
    y: task.y + 2,
    width: task.x2 - task.x1,
    height: 15,
    progressX: task.progressX,
    progressWidth: task.progressWidth,
    barCornerRadius: task.barCornerRadius,
    styles: taskStyle,
    isSelected: isSelected,
    onMouseDown: function onMouseDown(e) {
      isDateChangeable && onEventStart("move", task, e);
    }
  }), React__default.createElement("g", {
    className: "handleGroup"
  }, isDateChangeable && React__default.createElement("g", null, React__default.createElement(BarDateHandle, {
    x: task.x1 + 1,
    y: task.y + 1,
    width: task.handleWidth,
    height: handleHeight,
    barCornerRadius: task.barCornerRadius,
    onMouseDown: function onMouseDown(e) {
      onEventStart("start", task, e);
    }
  }), React__default.createElement(BarDateHandle, {
    x: task.x2 - task.handleWidth - 1,
    y: task.y + 1,
    width: task.handleWidth,
    height: handleHeight,
    barCornerRadius: task.barCornerRadius,
    onMouseDown: function onMouseDown(e) {
      onEventStart("end", task, e);
    }
  })), isRelationChangeable && React__default.createElement("g", null, React__default.createElement(BarRelationHandle, {
    isRelationDrawMode: isRelationDrawMode,
    x: task.x1 - relationCircleOffset,
    y: task.y + taskHalfHeight,
    radius: relationCircleRadius,
    onMouseDown: onLeftRelationTriggerMouseDown
  }), React__default.createElement(BarRelationHandle, {
    isRelationDrawMode: isRelationDrawMode,
    x: task.x2 + relationCircleOffset,
    y: task.y + taskHalfHeight,
    radius: relationCircleRadius,
    onMouseDown: onRightRelationTriggerMouseDown
  })), isProgressChangeable && x && React__default.createElement(BarProgressHandle, {
    progressPoint: progressPoint,
    onMouseDown: function onMouseDown(e) {
      onEventStart("progress", task, e);
    }
  }))));
};

var styles$7 = {"milestoneWrapper":"_RRr13","milestoneBackground":"_2P2B1"};

var Milestone = function Milestone(_ref) {
  var task = _ref.task,
    taskHalfHeight = _ref.taskHalfHeight,
    relationCircleOffset = _ref.relationCircleOffset,
    relationCircleRadius = _ref.relationCircleRadius,
    isDateChangeable = _ref.isDateChangeable,
    isRelationChangeable = _ref.isRelationChangeable,
    isRelationDrawMode = _ref.isRelationDrawMode,
    onEventStart = _ref.onEventStart,
    onRelationStart = _ref.onRelationStart,
    isSelected = _ref.isSelected;
  var _useProvideChipColors = useProvideChipColors(),
    resolveChipColor = _useProvideChipColors.resolveChipColor,
    resolveChipLabelColor = _useProvideChipColors.resolveChipLabelColor;
  var transform = "rotate(45 " + (task.x1 + task.height * 0.356) + " \n    " + (task.y + task.height * 0.85) + ")";
  var getBarColor = function getBarColor() {
    return isSelected ? resolveChipColor(task.color, "test") || "#ededed" : resolveChipLabelColor(task.color, "test") || "#ededed";
  };
  return React__default.createElement("g", {
    tabIndex: 0,
    className: classnames(styles$7.milestoneWrapper, stylesRelationHandle.barRelationHandleWrapper)
  }, React__default.createElement("rect", {
    fill: getBarColor(),
    x: task.x1,
    width: task.height,
    y: task.y,
    height: task.height,
    rx: task.barCornerRadius,
    ry: task.barCornerRadius,
    transform: transform,
    className: styles$7.milestoneBackground,
    onMouseDown: function onMouseDown(e) {
      isDateChangeable && onEventStart("move", task, e);
    }
  }), React__default.createElement("g", {
    className: "handleGroup"
  }, isRelationChangeable && React__default.createElement("g", null, React__default.createElement(BarRelationHandle, {
    isRelationDrawMode: isRelationDrawMode,
    x: task.x1 - relationCircleOffset,
    y: task.y + taskHalfHeight,
    radius: relationCircleRadius,
    onMouseDown: function onMouseDown() {
      onRelationStart("startOfTask", task);
    }
  }), React__default.createElement(BarRelationHandle, {
    isRelationDrawMode: isRelationDrawMode,
    x: task.x2 + relationCircleOffset,
    y: task.y + taskHalfHeight,
    radius: relationCircleRadius,
    onMouseDown: function onMouseDown() {
      onRelationStart("endOfTask", task);
    }
  }))));
};

var styles$8 = {"projectWrapper":"_1KJ6x","projectBackground":"_2RbVy","projectTop":"_2pZMF"};

var Project = function Project(_ref) {
  var task = _ref.task;
  var projectWith = task.x2 - task.x1;
  return React__default.createElement(HtmlTooltip, {
    followCursor: true,
    title: React__default.createElement(React__default.Fragment, null, React__default.createElement("div", {
      style: {
        margin: "auto"
      }
    }, React__default.createElement("div", {
      style: {
        padding: "0.5rem 1rem",
        borderRadius: "50px",
        fontWeight: "600",
        fontSize: "12px",
        maxHeight: "30px",
        lineHeight: 1,
        maxWidth: "235px",
        overflow: "hidden",
        wordWrap: "break-word",
        whiteSpace: "normal",
        textAlign: "center"
      }
    }, task.name)), React__default.createElement("pre", {
      className: styles$8.tooltipDefaultContainerParagraph
    }, task.start.getDate() + "." + (task.start.getMonth() + 1) + "." + task.start.getFullYear() + " - " + task.end.getDate() + "." + (task.end.getMonth() + 1) + "." + task.end.getFullYear()), task.end.getTime() - task.start.getTime() !== 0 && React__default.createElement("p", {
      className: styles$8.tooltipDefaultContainerParagraph
    }, "Duration: " + ~~((task.end.getTime() - task.start.getTime()) / (1000 * 60 * 60 * 24)) + " day(s)"), React__default.createElement("p", {
      className: styles$8.tooltipDefaultContainerParagraph
    }, !!task.progress && "Progress: " + task.progress + " %"))
  }, React__default.createElement("g", {
    tabIndex: 0,
    className: styles$8.projectWrapper
  }, React__default.createElement("rect", {
    fill: projectColors[task.progressColor].fg,
    x: task.x1,
    width: projectWith,
    y: task.y + 7,
    height: 5,
    rx: task.barCornerRadius,
    ry: task.barCornerRadius,
    className: styles$8.projectBackground
  }), React__default.createElement("rect", {
    x: task.progressX,
    width: task.progressWidth,
    y: task.y + 7,
    height: 5,
    ry: task.barCornerRadius,
    rx: task.barCornerRadius,
    fill: projectColors[task.progressColor].bg
  })));
};

var style = {"barLabel":"_3zRJQ","barLabelOutside":"_3KcaM"};

var TaskItem = function TaskItem(props) {
  var task = props.task,
    arrowIndent = props.arrowIndent,
    isDelete = props.isDelete,
    taskHeight = props.taskHeight,
    isSelected = props.isSelected,
    isRelationDrawMode = props.isRelationDrawMode,
    rtl = props.rtl,
    onEventStart = props.onEventStart;
  var textRef = React.useRef(null);
  var _useState = React.useState(React__default.createElement("div", null)),
    taskItem = _useState[0],
    setTaskItem = _useState[1];
  var _useState2 = React.useState(true),
    isTextInside = _useState2[0],
    setIsTextInside = _useState2[1];
  React.useEffect(function () {
    switch (task.typeInternal) {
      case "milestone":
        setTaskItem(React__default.createElement(Milestone, Object.assign({}, props)));
        break;
      case "project":
        setTaskItem(React__default.createElement(Project, Object.assign({}, props)));
        break;
      default:
        setTaskItem(React__default.createElement(Bar, Object.assign({}, props)));
        break;
    }
  }, [task, isSelected, isRelationDrawMode, props]);
  React.useEffect(function () {
    if (textRef.current) {
      setIsTextInside(textRef.current.getBBox().width < task.x2 - task.x1);
    }
  }, [textRef, task]);
  var getX = function getX() {
    var width = task.x2 - task.x1;
    var hasChild = task.barChildren.length > 0;
    if (isTextInside) {
      return task.x1 + width * 0.5;
    }
    if (rtl && textRef.current) {
      return task.x1 - textRef.current.getBBox().width - arrowIndent * +hasChild - arrowIndent * 0.2;
    } else {
      return task.x1 + width + arrowIndent * +hasChild + arrowIndent * 0.2;
    }
  };
  return React__default.createElement("g", {
    onKeyDown: function onKeyDown(e) {
      switch (e.key) {
        case "Delete":
          {
            if (isDelete) onEventStart("delete", task, e);
            break;
          }
      }
      e.stopPropagation();
    },
    onMouseEnter: function onMouseEnter(e) {
      onEventStart("mouseenter", task, e);
    },
    onMouseLeave: function onMouseLeave(e) {
      onEventStart("mouseleave", task, e);
    },
    onDoubleClick: function onDoubleClick(e) {
      onEventStart("dblclick", task, e);
    },
    onClick: function onClick(e) {
      onEventStart("click", task, e);
    },
    onFocus: function onFocus() {
      onEventStart("select", task);
    }
  }, taskItem, React__default.createElement("text", {
    x: getX(),
    y: task.y + taskHeight * 0.5,
    className: isTextInside ? style.barLabel :  style.barLabelOutside,
    ref: textRef
  }));
};

var TaskGanttContent = function TaskGanttContent(_ref) {
  var _svg$current;
  var tasks = _ref.tasks,
    dates = _ref.dates,
    ganttEvent = _ref.ganttEvent,
    ganttRelationEvent = _ref.ganttRelationEvent,
    selectedTask = _ref.selectedTask,
    rowHeight = _ref.rowHeight,
    columnWidth = _ref.columnWidth,
    timeStep = _ref.timeStep,
    svg = _ref.svg,
    taskHeight = _ref.taskHeight,
    taskHalfHeight = _ref.taskHalfHeight,
    relationCircleOffset = _ref.relationCircleOffset,
    relationCircleRadius = _ref.relationCircleRadius,
    arrowColor = _ref.arrowColor,
    arrowIndent = _ref.arrowIndent,
    fontFamily = _ref.fontFamily,
    fontSize = _ref.fontSize,
    rtl = _ref.rtl,
    setGanttEvent = _ref.setGanttEvent,
    setGanttRelationEvent = _ref.setGanttRelationEvent,
    setFailedTask = _ref.setFailedTask,
    setSelectedTask = _ref.setSelectedTask,
    onDateChange = _ref.onDateChange,
    onRelationChange = _ref.onRelationChange,
    onProgressChange = _ref.onProgressChange,
    onDoubleClick = _ref.onDoubleClick,
    onClick = _ref.onClick,
    onDelete = _ref.onDelete;
  var point = svg === null || svg === void 0 ? void 0 : (_svg$current = svg.current) === null || _svg$current === void 0 ? void 0 : _svg$current.createSVGPoint();
  var _useState = React.useState(0),
    xStep = _useState[0],
    setXStep = _useState[1];
  var _useState2 = React.useState(0),
    initEventX1Delta = _useState2[0],
    setInitEventX1Delta = _useState2[1];
  var _useState3 = React.useState(false),
    isMoving = _useState3[0],
    setIsMoving = _useState3[1];
  React.useEffect(function () {
    var dateDelta = dates[1].getTime() - dates[0].getTime() - dates[1].getTimezoneOffset() * 60 * 1000 + dates[0].getTimezoneOffset() * 60 * 1000;
    var newXStep = timeStep * columnWidth / dateDelta;
    setXStep(newXStep);
  }, [columnWidth, dates, timeStep]);
  React.useEffect(function () {
    var handleMouseMove = function handleMouseMove(event) {
      try {
        var _svg$current$getScree;
        if (!ganttEvent.changedTask || !point || !(svg !== null && svg !== void 0 && svg.current)) return Promise.resolve();
        event.preventDefault();
        point.x = event.clientX;
        var cursor = point.matrixTransform(svg === null || svg === void 0 ? void 0 : (_svg$current$getScree = svg.current.getScreenCTM()) === null || _svg$current$getScree === void 0 ? void 0 : _svg$current$getScree.inverse());
        console.log("TASKS:", tasks);
        var _handleTaskBySVGMouse = handleTaskBySVGMouseEvent(cursor.x, ganttEvent.action, ganttEvent.changedTask, tasks, xStep, timeStep, initEventX1Delta, rtl),
          isChanged = _handleTaskBySVGMouse.isChanged,
          changedTask = _handleTaskBySVGMouse.changedTask,
          changedTasks = _handleTaskBySVGMouse.changedTasks;
        if (isChanged) {
          console.log("CHT", changedTask);
          setGanttEvent({
            action: ganttEvent.action,
            changedTask: changedTask,
            changedTasks: changedTasks
          });
        }
        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    };
    var handleMouseUp = function handleMouseUp(event) {
      try {
        var _svg$current$getScree2;
        var _temp5 = function _temp5() {
          if (!operationSuccess) {
            setFailedTask(originalSelectedTask);
          }
        };
        var action = ganttEvent.action,
          originalSelectedTask = ganttEvent.originalSelectedTask,
          changedTask = ganttEvent.changedTask;
        if (!changedTask || !point || !(svg !== null && svg !== void 0 && svg.current) || !originalSelectedTask) return Promise.resolve();
        event.preventDefault();
        point.x = event.clientX;
        var cursor = point.matrixTransform(svg === null || svg === void 0 ? void 0 : (_svg$current$getScree2 = svg.current.getScreenCTM()) === null || _svg$current$getScree2 === void 0 ? void 0 : _svg$current$getScree2.inverse());
        var _handleTaskBySVGMouse2 = handleTaskBySVGMouseEvent(cursor.x, action, changedTask, tasks, xStep, timeStep, initEventX1Delta, rtl),
          newChangedTask = _handleTaskBySVGMouse2.changedTask,
          changedTasks = _handleTaskBySVGMouse2.changedTasks;
        var isNotLikeOriginal = originalSelectedTask.start !== newChangedTask.start || originalSelectedTask.prevEnd !== newChangedTask.end || originalSelectedTask.progress !== newChangedTask.progress;
        svg.current.removeEventListener("mousemove", handleMouseMove);
        svg.current.removeEventListener("mouseup", handleMouseUp);
        setGanttEvent({
          action: ""
        });
        setIsMoving(false);
        console.log("NCT", newChangedTask);
        var operationSuccess = true;
        console.log("CONDITION", originalSelectedTask.start, newChangedTask.start);
        var _temp4 = function () {
          if ((action === "move" || action === "end" || action === "start") && onDateChange && isNotLikeOriginal) {
            var _temp = _catch(function () {
              console.log("CODE0", newChangedTask);
              return Promise.resolve(onDateChange(newChangedTask, newChangedTask.barChildren, changedTasks)).then(function (result) {
                console.log("RESULT CONTENT", result);
                if (result !== undefined) {
                  console.log("SUCCESS");
                  operationSuccess = result;
                }
              });
            }, function () {
              console.log("ERROR");
              operationSuccess = false;
            });
            if (_temp && _temp.then) return _temp.then(function () {});
          } else {
            var _temp6 = function () {
              if (onProgressChange && isNotLikeOriginal) {
                var _temp2 = _catch(function () {
                  return Promise.resolve(onProgressChange(newChangedTask, newChangedTask.barChildren)).then(function (result) {
                    if (result !== undefined) {
                      operationSuccess = result;
                    }
                  });
                }, function () {
                  operationSuccess = false;
                });
                if (_temp2 && _temp2.then) return _temp2.then(function () {});
              }
            }();
            if (_temp6 && _temp6.then) return _temp6.then(function () {});
          }
        }();
        return Promise.resolve(_temp4 && _temp4.then ? _temp4.then(_temp5) : _temp5(_temp4));
      } catch (e) {
        return Promise.reject(e);
      }
    };
    if (!isMoving && (ganttEvent.action === "move" || ganttEvent.action === "end" || ganttEvent.action === "start" || ganttEvent.action === "progress") && svg !== null && svg !== void 0 && svg.current) {
      svg.current.addEventListener("mousemove", handleMouseMove);
      svg.current.addEventListener("mouseup", handleMouseUp);
      setIsMoving(true);
    }
  }, [ganttEvent, xStep, initEventX1Delta, onProgressChange, timeStep, onDateChange, svg, isMoving, point, rtl, setFailedTask, setGanttEvent, tasks]);
  var startRelationTarget = ganttRelationEvent === null || ganttRelationEvent === void 0 ? void 0 : ganttRelationEvent.target;
  var startRelationTask = ganttRelationEvent === null || ganttRelationEvent === void 0 ? void 0 : ganttRelationEvent.task;
  React.useEffect(function () {
    if (!onRelationChange || !startRelationTarget || !startRelationTask) {
      return undefined;
    }
    var svgNode = svg === null || svg === void 0 ? void 0 : svg.current;
    if (!svgNode) {
      return undefined;
    }
    if (!point) {
      return undefined;
    }
    var handleMouseMove = function handleMouseMove(event) {
      var clientX = event.clientX,
        clientY = event.clientY;
      point.x = clientX;
      point.y = clientY;
      var ctm = svgNode.getScreenCTM();
      if (!ctm) {
        return;
      }
      var svgP = point.matrixTransform(ctm.inverse());
      setGanttRelationEvent(function (prevValue) {
        if (!prevValue) {
          return null;
        }
        return _extends({}, prevValue, {
          endX: svgP.x,
          endY: svgP.y
        });
      });
    };
    var handleMouseUp = function handleMouseUp(event) {
      var clientX = event.clientX,
        clientY = event.clientY;
      point.x = clientX;
      point.y = clientY;
      var ctm = svgNode.getScreenCTM();
      if (!ctm) {
        return;
      }
      var svgP = point.matrixTransform(ctm.inverse());
      var endTargetRelationCircle = getRelationCircleByCoordinates(svgP, tasks, taskHalfHeight, relationCircleOffset, relationCircleRadius, rtl);
      if (endTargetRelationCircle) {
        onRelationChange([startRelationTask, startRelationTarget], endTargetRelationCircle);
      }
      setGanttRelationEvent(null);
    };
    svgNode.addEventListener("mousemove", handleMouseMove);
    svgNode.addEventListener("mouseup", handleMouseUp);
    return function () {
      svgNode.removeEventListener("mousemove", handleMouseMove);
      svgNode.removeEventListener("mouseup", handleMouseUp);
    };
  }, [svg, rtl, point, startRelationTarget, startRelationTask, setGanttRelationEvent, tasks, taskHalfHeight, relationCircleOffset, relationCircleRadius, onRelationChange]);
  var handleBarEventStart = function handleBarEventStart(action, task, event) {
    try {
      return Promise.resolve(function () {
        if (!event) {
          if (action === "select") {
            setSelectedTask(task.id);
          }
        } else return function () {
          if (isKeyboardEvent(event)) {
            var _temp9 = function () {
              if (action === "delete") {
                var _temp8 = function () {
                  if (onDelete) {
                    var _temp7 = _catch(function () {
                      return Promise.resolve(onDelete(task)).then(function (result) {
                        if (result !== undefined && result) {
                          setGanttEvent({
                            action: action,
                            changedTask: task
                          });
                        }
                      });
                    }, function (error) {
                      console.error("Error on Delete. " + error);
                    });
                    if (_temp7 && _temp7.then) return _temp7.then(function () {});
                  }
                }();
                if (_temp8 && _temp8.then) return _temp8.then(function () {});
              }
            }();
            if (_temp9 && _temp9.then) return _temp9.then(function () {});
          } else if (action === "mouseenter") {
            if (!ganttEvent.action) {
              setGanttEvent({
                action: action,
                changedTask: task,
                originalSelectedTask: task
              });
            }
          } else if (action === "mouseleave") {
            if (ganttEvent.action === "mouseenter") {
              setGanttEvent({
                action: ""
              });
            }
          } else if (action === "dblclick") {
            !!onDoubleClick && onDoubleClick(task);
          } else if (action === "click") {
            !!onClick && onClick(task);
          } else if (action === "move") {
            var _svg$current$getScree3;
            if (!(svg !== null && svg !== void 0 && svg.current) || !point) return;
            point.x = event.clientX;
            var cursor = point.matrixTransform((_svg$current$getScree3 = svg.current.getScreenCTM()) === null || _svg$current$getScree3 === void 0 ? void 0 : _svg$current$getScree3.inverse());
            setInitEventX1Delta(cursor.x - task.x1);
            setGanttEvent({
              action: action,
              changedTask: task,
              originalSelectedTask: task
            });
            console.log(task);
            console.log(tasks);
          } else {
            setGanttEvent({
              action: action,
              changedTask: task,
              originalSelectedTask: task
            });
          }
        }();
      }());
    } catch (e) {
      return Promise.reject(e);
    }
  };
  var handleBarRelationStart = React.useCallback(function (target, task) {
    var startX = target === "startOfTask" !== rtl ? task.x1 - 10 : task.x2 + 10;
    var startY = task.y + Math.round(task.height / 2);
    setGanttRelationEvent({
      target: target,
      task: task,
      startX: startX,
      startY: startY,
      endX: startX,
      endY: startY
    });
  }, [setGanttRelationEvent, rtl]);
  return React__default.createElement("g", {
    className: "content"
  }, React__default.createElement("g", {
    className: "arrows",
    fill: arrowColor,
    stroke: arrowColor
  }, tasks.map(function (task) {
    return task.barChildren.map(function (child) {
      return React__default.createElement(Arrow, {
        key: "Arrow from " + task.id + " to " + tasks[child.index].id,
        taskFrom: task,
        taskTo: tasks[child.index],
        rowHeight: rowHeight,
        taskHeight: taskHeight,
        arrowIndent: arrowIndent,
        rtl: rtl
      });
    });
  })), React__default.createElement("g", {
    className: "bar",
    fontFamily: fontFamily,
    fontSize: fontSize
  }, tasks.map(function (task) {
    return React__default.createElement(TaskItem, {
      task: task,
      arrowIndent: arrowIndent,
      taskHeight: taskHeight,
      taskHalfHeight: taskHalfHeight,
      relationCircleOffset: relationCircleOffset,
      relationCircleRadius: relationCircleRadius,
      isRelationDrawMode: Boolean(ganttRelationEvent),
      isProgressChangeable: !!onProgressChange && !task.isDisabled,
      isDateChangeable: !!onDateChange && !task.isDisabled,
      isRelationChangeable: !!onRelationChange && !task.isDisabled,
      isDelete: !task.isDisabled,
      onEventStart: handleBarEventStart,
      onRelationStart: handleBarRelationStart,
      key: task.id,
      isSelected: !!selectedTask && task.id === selectedTask.id,
      rtl: rtl
    });
  })), ganttRelationEvent && React__default.createElement(RelationLine, {
    x1: ganttRelationEvent.startX,
    x2: ganttRelationEvent.endX,
    y1: ganttRelationEvent.startY,
    y2: ganttRelationEvent.endY
  }));
};

var styles$9 = {"ganttVerticalContainer":"_CZjuD","ganttVerticalContainerChanged":"_15X0H","horizontalContainer":"_2B2zv","horizontalContainerChanged":"_1zqJ8","wrapper":"_3eULf"};

var TaskGantt = function TaskGantt(_ref) {
  var gridProps = _ref.gridProps,
    calendarProps = _ref.calendarProps,
    barProps = _ref.barProps,
    ganttHeight = _ref.ganttHeight,
    scrollY = _ref.scrollY,
    scrollX = _ref.scrollX;
  var ganttSVGRef = React.useRef(null);
  var horizontalContainerRef = React.useRef(null);
  var verticalGanttContainerRef = React.useRef(null);
  var newBarProps = _extends({}, barProps, {
    svg: ganttSVGRef
  });
  React.useEffect(function () {
    if (horizontalContainerRef.current) {
      horizontalContainerRef.current.scrollTop = scrollY;
    }
  }, [scrollY]);
  React.useEffect(function () {
    if (verticalGanttContainerRef.current) {
      verticalGanttContainerRef.current.scrollLeft = scrollX;
    }
  }, [scrollX]);
  return React__default.createElement("div", {
    className: styles$9.ganttVerticalContainerChanged,
    ref: verticalGanttContainerRef,
    dir: "ltr"
  }, React__default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: gridProps.svgWidth,
    height: calendarProps.headerHeight,
    fontFamily: barProps.fontFamily
  }, React__default.createElement(Calendar, Object.assign({}, calendarProps))), React__default.createElement("div", {
    ref: horizontalContainerRef,
    className: styles$9.horizontalContainer,
    style: ganttHeight ? {
      height: ganttHeight,
      width: gridProps.svgWidth
    } : {
      width: gridProps.svgWidth
    }
  }, React__default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: gridProps.svgWidth,
    height: barProps.rowHeight * barProps.tasks.length,
    fontFamily: barProps.fontFamily,
    ref: ganttSVGRef
  }, React__default.createElement(Grid, Object.assign({}, gridProps)), React__default.createElement(TaskGanttContent, Object.assign({}, newBarProps)))));
};

var Gantt = function Gantt(_ref) {
  var tasks = _ref.tasks,
    _ref$headerHeight = _ref.headerHeight,
    headerHeight = _ref$headerHeight === void 0 ? 50 : _ref$headerHeight,
    _ref$columnWidth = _ref.columnWidth,
    columnWidth = _ref$columnWidth === void 0 ? 60 : _ref$columnWidth,
    _ref$listCellWidth = _ref.listCellWidth,
    listCellWidth = _ref$listCellWidth === void 0 ? "155px" : _ref$listCellWidth,
    _ref$rowHeight = _ref.rowHeight,
    rowHeight = _ref$rowHeight === void 0 ? 50 : _ref$rowHeight,
    _ref$relationCircleOf = _ref.relationCircleOffset,
    relationCircleOffset = _ref$relationCircleOf === void 0 ? 10 : _ref$relationCircleOf,
    _ref$relationCircleRa = _ref.relationCircleRadius,
    relationCircleRadius = _ref$relationCircleRa === void 0 ? 5 : _ref$relationCircleRa,
    _ref$ganttHeight = _ref.ganttHeight,
    ganttHeight = _ref$ganttHeight === void 0 ? 0 : _ref$ganttHeight,
    _ref$viewMode = _ref.viewMode,
    viewMode = _ref$viewMode === void 0 ? exports.ViewMode.Day : _ref$viewMode,
    _ref$preStepsCount = _ref.preStepsCount,
    preStepsCount = _ref$preStepsCount === void 0 ? 1 : _ref$preStepsCount,
    _ref$locale = _ref.locale,
    locale = _ref$locale === void 0 ? "en-GB" : _ref$locale,
    _ref$barFill = _ref.barFill,
    barFill = _ref$barFill === void 0 ? 60 : _ref$barFill,
    _ref$barCornerRadius = _ref.barCornerRadius,
    barCornerRadius = _ref$barCornerRadius === void 0 ? 3 : _ref$barCornerRadius,
    _ref$barProgressColor = _ref.barProgressColor,
    barProgressColor = _ref$barProgressColor === void 0 ? "#a3a3ff" : _ref$barProgressColor,
    _ref$barProgressSelec = _ref.barProgressSelectedColor,
    barProgressSelectedColor = _ref$barProgressSelec === void 0 ? "#8282f5" : _ref$barProgressSelec,
    _ref$barBackgroundCol = _ref.barBackgroundColor,
    barBackgroundColor = _ref$barBackgroundCol === void 0 ? "#b8c2cc" : _ref$barBackgroundCol,
    _ref$barBackgroundSel = _ref.barBackgroundSelectedColor,
    barBackgroundSelectedColor = _ref$barBackgroundSel === void 0 ? "#aeb8c2" : _ref$barBackgroundSel,
    _ref$projectProgressC = _ref.projectProgressColor,
    projectProgressColor = _ref$projectProgressC === void 0 ? "#7db59a" : _ref$projectProgressC,
    _ref$projectProgressS = _ref.projectProgressSelectedColor,
    projectProgressSelectedColor = _ref$projectProgressS === void 0 ? "#59a985" : _ref$projectProgressS,
    _ref$projectBackgroun = _ref.projectBackgroundColor,
    projectBackgroundColor = _ref$projectBackgroun === void 0 ? "#fac465" : _ref$projectBackgroun,
    _ref$projectBackgroun2 = _ref.projectBackgroundSelectedColor,
    projectBackgroundSelectedColor = _ref$projectBackgroun2 === void 0 ? "#f7bb53" : _ref$projectBackgroun2,
    _ref$milestoneBackgro = _ref.milestoneBackgroundColor,
    milestoneBackgroundColor = _ref$milestoneBackgro === void 0 ? "#f1c453" : _ref$milestoneBackgro,
    _ref$milestoneBackgro2 = _ref.milestoneBackgroundSelectedColor,
    milestoneBackgroundSelectedColor = _ref$milestoneBackgro2 === void 0 ? "#f29e4c" : _ref$milestoneBackgro2,
    _ref$rtl = _ref.rtl,
    rtl = _ref$rtl === void 0 ? false : _ref$rtl,
    _ref$handleWidth = _ref.handleWidth,
    handleWidth = _ref$handleWidth === void 0 ? 8 : _ref$handleWidth,
    _ref$timeStep = _ref.timeStep,
    timeStep = _ref$timeStep === void 0 ? 300000 : _ref$timeStep,
    _ref$arrowColor = _ref.arrowColor,
    arrowColor = _ref$arrowColor === void 0 ? "grey" : _ref$arrowColor,
    _ref$fontFamily = _ref.fontFamily,
    fontFamily = _ref$fontFamily === void 0 ? "Arial, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue" : _ref$fontFamily,
    _ref$fontSize = _ref.fontSize,
    fontSize = _ref$fontSize === void 0 ? "14px" : _ref$fontSize,
    _ref$arrowIndent = _ref.arrowIndent,
    arrowIndent = _ref$arrowIndent === void 0 ? 20 : _ref$arrowIndent,
    _ref$todayColor = _ref.todayColor,
    todayColor = _ref$todayColor === void 0 ? "rgba(252, 248, 227, 0.5)" : _ref$todayColor,
    viewDate = _ref.viewDate,
    _ref$TaskListHeader = _ref.TaskListHeader,
    TaskListHeader = _ref$TaskListHeader === void 0 ? TaskListHeaderDefault : _ref$TaskListHeader,
    _ref$TaskListTable = _ref.TaskListTable,
    TaskListTable = _ref$TaskListTable === void 0 ? TaskListTableDefault : _ref$TaskListTable,
    onDateChange = _ref.onDateChange,
    onRelationChange = _ref.onRelationChange,
    onProgressChange = _ref.onProgressChange,
    onDoubleClick = _ref.onDoubleClick,
    onClick = _ref.onClick,
    onDelete = _ref.onDelete,
    onSelect = _ref.onSelect,
    onExpanderClick = _ref.onExpanderClick;
  var wrapperRef = React.useRef(null);
  var taskListRef = React.useRef(null);
  var _useState = React.useState(function () {
      var _ganttDateRange = ganttDateRange(tasks, viewMode, preStepsCount),
        startDate = _ganttDateRange[0],
        endDate = _ganttDateRange[1];
      return {
        viewMode: viewMode,
        dates: seedDates(startDate, endDate, viewMode)
      };
    }),
    dateSetup = _useState[0],
    setDateSetup = _useState[1];
  var _useState2 = React.useState(undefined),
    currentViewDate = _useState2[0],
    setCurrentViewDate = _useState2[1];
  var _useState3 = React.useState([]),
    barTasks = _useState3[0],
    setBarTasks = _useState3[1];
  var _useState4 = React.useState({
      action: ""
    }),
    ganttEvent = _useState4[0],
    setGanttEvent = _useState4[1];
  var _useState5 = React.useState(null),
    ganttRelationEvent = _useState5[0],
    setGanttRelationEvent = _useState5[1];
  var taskHeight = React.useMemo(function () {
    return rowHeight * barFill / 100;
  }, [rowHeight, barFill]);
  var taskHalfHeight = React.useMemo(function () {
    return Math.round(taskHeight / 2);
  }, [taskHeight]);
  var _useState6 = React.useState(),
    selectedTask = _useState6[0],
    setSelectedTask = _useState6[1];
  var _useState7 = React.useState(null),
    failedTask = _useState7[0],
    setFailedTask = _useState7[1];
  var svgWidth = dateSetup.dates.length * columnWidth;
  var ganttFullHeight = barTasks.length * rowHeight;
  var _useState8 = React.useState(0),
    scrollY = _useState8[0],
    setScrollY = _useState8[1];
  var _useState9 = React.useState(-1),
    scrollX = _useState9[0],
    setScrollX = _useState9[1];
  var _useState10 = React.useState(false),
    ignoreScrollEvent = _useState10[0],
    setIgnoreScrollEvent = _useState10[1];
  React.useEffect(function () {
    var filteredTasks;
    if (onExpanderClick) {
      filteredTasks = removeHiddenTasks(tasks);
    } else {
      filteredTasks = tasks;
    }
    filteredTasks = filteredTasks.sort(sortTasks);
    var _ganttDateRange2 = ganttDateRange(filteredTasks, viewMode, preStepsCount),
      startDate = _ganttDateRange2[0],
      endDate = _ganttDateRange2[1];
    var newDates = seedDates(startDate, endDate, viewMode);
    if (rtl) {
      newDates = newDates.reverse();
      if (scrollX === -1) {
        setScrollX(newDates.length * columnWidth);
      }
    }
    setDateSetup({
      dates: newDates,
      viewMode: viewMode
    });
    setBarTasks(convertToBarTasks(filteredTasks, newDates, columnWidth, rowHeight, taskHeight, barCornerRadius, handleWidth, rtl, barProgressColor, barProgressSelectedColor, barBackgroundColor, barBackgroundSelectedColor, projectProgressColor, projectProgressSelectedColor, projectBackgroundColor, projectBackgroundSelectedColor, milestoneBackgroundColor, milestoneBackgroundSelectedColor));
  }, [tasks, viewMode, preStepsCount, rowHeight, barCornerRadius, columnWidth, taskHeight, handleWidth, barProgressColor, barProgressSelectedColor, barBackgroundColor, barBackgroundSelectedColor, projectProgressColor, projectProgressSelectedColor, projectBackgroundColor, projectBackgroundSelectedColor, milestoneBackgroundColor, milestoneBackgroundSelectedColor, rtl, onExpanderClick]);
  React.useEffect(function () {
    if (viewMode === dateSetup.viewMode && (viewDate && !currentViewDate || viewDate && (currentViewDate === null || currentViewDate === void 0 ? void 0 : currentViewDate.valueOf()) !== viewDate.valueOf())) {
      var dates = dateSetup.dates;
      var index = dates.findIndex(function (d, i) {
        return viewDate.valueOf() >= d.valueOf() && i + 1 !== dates.length && viewDate.valueOf() < dates[i + 1].valueOf();
      });
      if (index === -1) {
        return;
      }
      setCurrentViewDate(viewDate);
      setScrollX(columnWidth * index);
    }
  }, [viewDate, columnWidth, dateSetup.dates, dateSetup.viewMode, viewMode, currentViewDate, setCurrentViewDate]);
  React.useEffect(function () {
    var changedTask = ganttEvent.changedTask,
      action = ganttEvent.action,
      changedTasks = ganttEvent.changedTasks;
    if (changedTask) {
      if (action === "delete") {
        setGanttEvent({
          action: ""
        });
        setBarTasks(barTasks.filter(function (t) {
          return t.id !== changedTask.id;
        }));
      } else if (action === "move" || action === "end" || action === "start" || action === "progress") {
        var prevStateTask = barTasks.find(function (t) {
          return t.id === changedTask.id;
        });
        if (prevStateTask && (prevStateTask.start.getTime() !== changedTask.start.getTime() || prevStateTask.end.getTime() !== changedTask.end.getTime() || prevStateTask.progress !== changedTask.progress)) {
          console.log("CHANGED TASKS", changedTasks);
          if ((changedTasks === null || changedTasks === void 0 ? void 0 : changedTasks.length) !== 0 && (changedTasks === null || changedTasks === void 0 ? void 0 : changedTasks.length) !== undefined) {
            console.log("CHANGED TASKSTEST", changedTasks);
            var mergedArray = barTasks.map(function (barTask) {
              var changedItem = changedTasks.find(function (item) {
                return item.id === barTask.id;
              });
              console.log("CHITM", changedItem);
              if (changedItem) {
                console.log(_extends({}, barTask, changedItem));
                return _extends({}, barTask, changedItem);
              } else {
                return barTask;
              }
            });
            setBarTasks(mergedArray);
            console.log("BAR TASKS", mergedArray);
          } else {
            var newTaskList = barTasks.map(function (t) {
              return t.id === changedTask.id ? changedTask : t;
            });
            setBarTasks(newTaskList);
          }
        }
      }
    }
  }, [barTasks, ganttEvent]);
  React.useEffect(function () {
    if (failedTask) {
      setBarTasks(barTasks.map(function (t) {
        return t.id !== failedTask.id ? t : failedTask;
      }));
      setFailedTask(null);
    }
  }, [failedTask, barTasks]);
  React.useEffect(function () {
    var _wrapperRef$current;
    var handleWheel = function handleWheel(event) {
      if (event.shiftKey || event.deltaX) {
        var scrollMove = event.deltaX ? event.deltaX : event.deltaY;
        var newScrollX = scrollX + scrollMove;
        if (newScrollX < 0) {
          newScrollX = 0;
        } else if (newScrollX > svgWidth) {
          newScrollX = svgWidth;
        }
        setScrollX(newScrollX);
        event.preventDefault();
      } else if (ganttHeight) {
        var newScrollY = scrollY + event.deltaY;
        if (newScrollY < 0) {
          newScrollY = 0;
        } else if (newScrollY > ganttFullHeight - ganttHeight) {
          newScrollY = ganttFullHeight - ganttHeight;
        }
        if (newScrollY !== scrollY) {
          setScrollY(newScrollY);
          event.preventDefault();
        }
      }
      setIgnoreScrollEvent(true);
    };
    (_wrapperRef$current = wrapperRef.current) === null || _wrapperRef$current === void 0 ? void 0 : _wrapperRef$current.addEventListener("wheel", handleWheel, {
      passive: false
    });
    return function () {
      var _wrapperRef$current2;
      (_wrapperRef$current2 = wrapperRef.current) === null || _wrapperRef$current2 === void 0 ? void 0 : _wrapperRef$current2.removeEventListener("wheel", handleWheel);
    };
  }, [wrapperRef, scrollY, scrollX, ganttHeight, svgWidth, rtl, ganttFullHeight]);
  var handleScrollY = function handleScrollY(event) {
    if (scrollY !== event.currentTarget.scrollTop && !ignoreScrollEvent) {
      setScrollY(event.currentTarget.scrollTop);
      setIgnoreScrollEvent(true);
    } else {
      setIgnoreScrollEvent(false);
    }
  };
  var handleKeyDown = function handleKeyDown(event) {
    event.preventDefault();
    var newScrollY = scrollY;
    var newScrollX = scrollX;
    var isX = true;
    switch (event.key) {
      case "Down":
      case "ArrowDown":
        newScrollY += rowHeight;
        isX = false;
        break;
      case "Up":
      case "ArrowUp":
        newScrollY -= rowHeight;
        isX = false;
        break;
      case "Left":
      case "ArrowLeft":
        newScrollX -= columnWidth;
        break;
      case "Right":
      case "ArrowRight":
        newScrollX += columnWidth;
        break;
    }
    if (isX) {
      if (newScrollX < 0) {
        newScrollX = 0;
      } else if (newScrollX > svgWidth) {
        newScrollX = svgWidth;
      }
      setScrollX(newScrollX);
    } else {
      if (newScrollY < 0) {
        newScrollY = 0;
      } else if (newScrollY > ganttFullHeight - ganttHeight) {
        newScrollY = ganttFullHeight - ganttHeight;
      }
      setScrollY(newScrollY);
    }
    setIgnoreScrollEvent(true);
  };
  var handleSelectedTask = function handleSelectedTask(taskId) {
    var newSelectedTask = barTasks.find(function (t) {
      return t.id === taskId;
    });
    var oldSelectedTask = barTasks.find(function (t) {
      return !!selectedTask && t.id === selectedTask.id;
    });
    if (onSelect) {
      if (oldSelectedTask) {
        onSelect(oldSelectedTask, false);
      }
      if (newSelectedTask) {
        onSelect(newSelectedTask, true);
      }
    }
    setSelectedTask(newSelectedTask);
  };
  var handleExpanderClick = function handleExpanderClick(task) {
    if (onExpanderClick && task.hideChildren !== undefined) {
      onExpanderClick(_extends({}, task, {
        hideChildren: !task.hideChildren
      }));
    }
  };
  var gridProps = {
    columnWidth: columnWidth,
    svgWidth: svgWidth,
    tasks: tasks,
    rowHeight: rowHeight,
    dates: dateSetup.dates,
    todayColor: todayColor,
    rtl: rtl
  };
  var calendarProps = {
    dateSetup: dateSetup,
    locale: locale,
    viewMode: viewMode,
    headerHeight: headerHeight,
    columnWidth: columnWidth,
    fontFamily: fontFamily,
    fontSize: fontSize,
    rtl: rtl
  };
  var barProps = {
    tasks: barTasks,
    dates: dateSetup.dates,
    ganttEvent: ganttEvent,
    ganttRelationEvent: ganttRelationEvent,
    selectedTask: selectedTask,
    rowHeight: rowHeight,
    taskHeight: taskHeight,
    taskHalfHeight: taskHalfHeight,
    relationCircleOffset: relationCircleOffset,
    relationCircleRadius: relationCircleRadius,
    columnWidth: columnWidth,
    arrowColor: arrowColor,
    timeStep: timeStep,
    fontFamily: fontFamily,
    fontSize: fontSize,
    arrowIndent: arrowIndent,
    svgWidth: svgWidth,
    rtl: rtl,
    setGanttEvent: setGanttEvent,
    setGanttRelationEvent: setGanttRelationEvent,
    setFailedTask: setFailedTask,
    setSelectedTask: handleSelectedTask,
    onDateChange: onDateChange,
    onRelationChange: onRelationChange,
    onProgressChange: onProgressChange,
    onDoubleClick: onDoubleClick,
    onClick: onClick,
    onDelete: onDelete
  };
  var tableProps = {
    rowHeight: rowHeight,
    rowWidth: listCellWidth,
    fontFamily: fontFamily,
    fontSize: fontSize,
    tasks: barTasks,
    locale: locale,
    headerHeight: headerHeight,
    scrollY: scrollY,
    ganttHeight: ganttHeight,
    horizontalContainerClass: styles$9.horizontalContainer,
    selectedTask: selectedTask,
    taskListRef: taskListRef,
    setSelectedTask: handleSelectedTask,
    onExpanderClick: handleExpanderClick,
    TaskListHeader: TaskListHeader,
    TaskListTable: TaskListTable
  };
  return React__default.createElement("div", null, React__default.createElement("div", {
    className: styles$9.wrapper,
    onKeyDown: handleKeyDown,
    tabIndex: 0,
    ref: wrapperRef
  }, listCellWidth && React__default.createElement(TaskList, Object.assign({}, tableProps)), React__default.createElement(TaskGantt, {
    gridProps: gridProps,
    calendarProps: calendarProps,
    barProps: barProps,
    ganttHeight: ganttHeight,
    scrollY: scrollY,
    scrollX: scrollX
  }), React__default.createElement(VerticalScroll, {
    ganttFullHeight: ganttFullHeight,
    ganttHeight: ganttHeight,
    headerHeight: headerHeight,
    scroll: scrollY,
    onScroll: handleScrollY,
    rtl: rtl
  })));
};

exports.Gantt = Gantt;
//# sourceMappingURL=index.js.map
