import React, {
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";

import {
  FaArrowLeft,
  FaChartBar,
  FaShoppingCart,
  FaClock,
  FaCheckCircle,
  FaTruck,
  FaTimesCircle,
  FaRupeeSign,
  FaBox,
  FaStore,
  FaChartLine,
  FaArrowRight,
  FaUsers,
  FaCalendarAlt,
  FaTrophy,
  FaTags,
  FaBoxes,
  FaTimes,
  FaEye
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import "./Reports.css";


function Reports() {

  const navigate = useNavigate();


  /* =========================================
     STATE
  ========================================= */

  const [orders, setOrders] = useState([]);

  const [period, setPeriod] =
    useState("All Time");

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [selectedReport, setSelectedReport] =
    useState(null);


  /* =========================================
     DATE FILTER STATE
  ========================================= */

  const [fromDate, setFromDate] =
    useState("");

  const [toDate, setToDate] =
    useState("");


  /* =========================================
     DATE PICKER REFERENCES
  ========================================= */

  const fromDatePickerRef =
    useRef(null);

  const toDatePickerRef =
    useRef(null);


  /* =========================================
     API
  ========================================= */

  const API_URL =
    "http://localhost:8080/api/orders";


  /* =========================================
     LOAD ORDERS FROM DATABASE
  ========================================= */

  const loadOrders = async () => {

    setLoading(true);

    try {

      const response =
        await fetch(API_URL);

      if (!response.ok) {

        throw new Error(
          "Unable to load orders"
        );

      }

      const data =
        await response.json();

      if (Array.isArray(data)) {

        setOrders(data);

      } else {

        setOrders([]);

      }

    } catch (error) {

      console.error(
        "Unable to load orders:",
        error
      );

      setOrders([]);

    } finally {

      setLoading(false);

    }

  };


  /* =========================================
     LOAD WHEN PAGE OPENS
  ========================================= */

  useEffect(() => {

    loadOrders();


    const handleFocus = () => {

      loadOrders();

    };


    const handleVisibilityChange = () => {

      if (
        document.visibilityState ===
        "visible"
      ) {

        loadOrders();

      }

    };


    window.addEventListener(
      "focus",
      handleFocus
    );


    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );


    return () => {

      window.removeEventListener(
        "focus",
        handleFocus
      );


      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );

    };

  }, []);


  /* =========================================
     GET ITEMS
  ========================================= */

  const getItems = (order) => {

    if (!order) {

      return [];

    }


    if (
      Array.isArray(order.items)
    ) {

      return order.items;

    }


    if (
      typeof order.items ===
      "string"
    ) {

      try {

        const parsed =
          JSON.parse(order.items);

        return Array.isArray(parsed)
          ? parsed
          : [];

      } catch (error) {

        console.error(
          "Items parsing error:",
          error
        );

        return [];

      }

    }


    return [];

  };


  /* =========================================
     CUSTOMER NAME
  ========================================= */

  const getCustomerName = (order) => {

    return (

      order?.ownerName ||

      order?.shopName ||

      order?.customerName ||

      order?.customer ||

      order?.email ||

      "Customer"

    );

  };


  /* =========================================
     ORDER ID
  ========================================= */

  const getOrderId = (order) => {

    return (

      order?.orderId ||

      order?.id ||

      "N/A"

    );

  };


  /* =========================================
     STATUS
  ========================================= */

  const getStatus = (order) => {

    const status =
      String(
        order?.status ||
        "Pending"
      ).trim();


    const lower =
      status.toLowerCase();


    if (
      lower ===
        "order received" ||

      lower ===
        "order_received"
    ) {

      return "Pending";

    }


    if (
      lower ===
        "cancelled" ||

      lower ===
        "canceled" ||

      lower ===
        "order cancelled"
    ) {

      return "Order Cancelled";

    }


    return status;

  };


  /* =========================================
     TOTAL AMOUNT
  ========================================= */

  const getTotal = (order) => {

    if (
      order?.totalAmount !==
        undefined &&

      order?.totalAmount !==
        null
    ) {

      return (
        Number(
          order.totalAmount
        ) || 0
      );

    }


    if (
      order?.total !==
      undefined
    ) {

      return (
        Number(
          order.total
        ) || 0
      );

    }


    if (
      order?.amount !==
      undefined
    ) {

      return (
        Number(
          order.amount
        ) || 0
      );

    }


    return 0;

  };


  /* =========================================
     TOTAL CASES
  ========================================= */

  const getCases = (order) => {

    if (
      order?.totalCases !==
        undefined &&

      order?.totalCases !==
        null
    ) {

      return (
        Number(
          order.totalCases
        ) || 0
      );

    }


    const items =
      getItems(order);


    return items.reduce(
      (
        total,
        item
      ) => {

        return (
          total +
          Number(
            item.quantity ||
            item.qty ||
            0
          )
        );

      },
      0
    );

  };


  /* =========================================
     TOTAL ITEMS
  ========================================= */

  const getItemCount = (order) => {

    if (
      order?.totalItems !==
        undefined &&

      order?.totalItems !==
        null
    ) {

      return (
        Number(
          order.totalItems
        ) || 0
      );

    }


    const items =
      getItems(order);


    return items.reduce(
      (
        total,
        item
      ) => {

        return (
          total +
          Number(
            item.quantity ||
            item.qty ||
            0
          )
        );

      },
      0
    );

  };


  /* =========================================
     ORDER DATE VALUE
  ========================================= */

  const getOrderDate = (order) => {

    return (

      order?.orderDate ||

      order?.createdAt ||

      order?.date ||

      ""

    );

  };


  /* =========================================
     IMPORTANT:
     PARSE INDIAN DATE + NORMAL ISO DATE
  ========================================= */

  const parseOrderDate = (value) => {

    if (!value) {

      return null;

    }


    /* -----------------------------------------
       Already Date object
    ----------------------------------------- */

    if (
      value instanceof Date
    ) {

      return isNaN(
        value.getTime()
      )
        ? null
        : value;

    }


    const text =
      String(value).trim();


    /* -----------------------------------------
       Format:
       28/09/2026, 10:30:00 pm
       28/09/2026, 10:30 pm
    ----------------------------------------- */

    const indianMatch =
      text.match(
        /^(\d{1,2})\/(\d{1,2})\/(\d{4}),?\s+(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(am|pm)?$/i
      );


    if (indianMatch) {

      const day =
        Number(
          indianMatch[1]
        );


      const month =
        Number(
          indianMatch[2]
        );


      const year =
        Number(
          indianMatch[3]
        );


      let hour =
        Number(
          indianMatch[4]
        );


      const minute =
        Number(
          indianMatch[5]
        );


      const second =
        Number(
          indianMatch[6] || 0
        );


      const ampm =
        indianMatch[7]
          ?.toLowerCase();


      if (
        ampm === "pm" &&
        hour < 12
      ) {

        hour += 12;

      }


      if (
        ampm === "am" &&
        hour === 12
      ) {

        hour = 0;

      }


      const date =
        new Date(
          year,
          month - 1,
          day,
          hour,
          minute,
          second
        );


      if (
        !isNaN(
          date.getTime()
        )
      ) {

        return date;

      }

    }


    /* -----------------------------------------
       Try normal ISO / JavaScript date
    ----------------------------------------- */

    const parsed =
      new Date(text);


    if (
      !isNaN(
        parsed.getTime()
      )
    ) {

      return parsed;

    }


    return null;

  };


  /* =========================================
     FORMAT DATE
  ========================================= */

  const formatDate = (value) => {

    const date =
      parseOrderDate(value);


    if (!date) {

      return "—";

    }


    return date.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }
    );

  };


  /* =========================================
     FORMAT DATE + TIME
  ========================================= */

  const formatDateTime = (value) => {

    const date =
      parseOrderDate(value);


    if (!date) {

      return "—";

    }


    return date.toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      }
    );

  };


  /* =========================================
     TODAY CHECK
  ========================================= */

  const isToday = (date) => {

    if (!date) {

      return false;

    }


    const today =
      new Date();


    return (

      date.getFullYear() ===
        today.getFullYear() &&

      date.getMonth() ===
        today.getMonth() &&

      date.getDate() ===
        today.getDate()

    );

  };


  /* =========================================
     THIS WEEK CHECK
     Monday -> Sunday
  ========================================= */

  const isThisWeek = (date) => {

    if (!date) {

      return false;

    }


    const today =
      new Date();


    const startOfWeek =
      new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );


    const day =
      startOfWeek.getDay();


    const daysFromMonday =
      day === 0
        ? 6
        : day - 1;


    startOfWeek.setDate(
      startOfWeek.getDate() -
      daysFromMonday
    );


    const endOfWeek =
      new Date(
        startOfWeek
      );


    endOfWeek.setDate(
      startOfWeek.getDate() +
      6
    );


    endOfWeek.setHours(
      23,
      59,
      59,
      999
    );


    return (

      date >=
        startOfWeek &&

      date <=
        endOfWeek

    );

  };


  /* =========================================
     THIS MONTH CHECK
  ========================================= */

  const isThisMonth = (date) => {

    if (!date) {

      return false;

    }


    const today =
      new Date();


    return (

      date.getFullYear() ===
        today.getFullYear() &&

      date.getMonth() ===
        today.getMonth()

    );

  };


  /* =========================================
     DATE INPUT:
     dd-mm-yyyy -> Date object
  ========================================= */

  const parseCustomDate = (value) => {

    if (!value) {

      return null;

    }


    const parts =
      value.split("-");


    if (
      parts.length !== 3
    ) {

      return null;

    }


    const day =
      Number(parts[0]);


    const month =
      Number(parts[1]);


    const year =
      Number(parts[2]);


    if (
      !day ||
      !month ||
      !year
    ) {

      return null;

    }


    if (
      day < 1 ||
      day > 31 ||
      month < 1 ||
      month > 12 ||
      year < 1000 ||
      year > 9999
    ) {

      return null;

    }


    const date =
      new Date(
        year,
        month - 1,
        day
      );


    if (
      date.getFullYear() !==
        year ||

      date.getMonth() !==
        month - 1 ||

      date.getDate() !==
        day
    ) {

      return null;

    }


    date.setHours(
      0,
      0,
      0,
      0
    );


    return date;

  };


  /* =========================================
     DATE INPUT FORMATTER
     25092026 -> 25-09-2026
  ========================================= */

  const formatTypedDate = (value) => {

    let numbers =
      value.replace(
        /\D/g,
        ""
      );


    if (
      numbers.length > 8
    ) {

      numbers =
        numbers.substring(
          0,
          8
        );

    }


    if (
      numbers.length > 4
    ) {

      return (
        numbers.substring(
          0,
          2
        ) +
        "-" +
        numbers.substring(
          2,
          4
        ) +
        "-" +
        numbers.substring(
          4
        )
      );

    }


    if (
      numbers.length > 2
    ) {

      return (
        numbers.substring(
          0,
          2
        ) +
        "-" +
        numbers.substring(
          2
        )
      );

    }


    return numbers;

  };


  /* =========================================
     FORMAT DATE PICKER VALUE
     yyyy-mm-dd -> dd-mm-yyyy
  ========================================= */

  const convertPickerDate =
    (value) => {

      if (!value) {

        return "";

      }


      const parts =
        value.split("-");


      if (
        parts.length !== 3
      ) {

        return "";

      }


      return (
        parts[2] +
        "-" +
        parts[1] +
        "-" +
        parts[0]
      );

    };


  /* =========================================
     FROM DATE CHANGE
  ========================================= */

  const handleFromDateChange = (
    event
  ) => {

    const value =
      formatTypedDate(
        event.target.value
      );


    setFromDate(value);


    if (value) {

      setPeriod(
        "Custom Date Range"
      );

    } else if (!toDate) {

      setPeriod(
        "All Time"
      );

    }

  };


  /* =========================================
     TO DATE CHANGE
  ========================================= */

  const handleToDateChange = (
    event
  ) => {

    const value =
      formatTypedDate(
        event.target.value
      );


    setToDate(value);


    if (value) {

      setPeriod(
        "Custom Date Range"
      );

    } else if (!fromDate) {

      setPeriod(
        "All Time"
      );

    }

  };


  /* =========================================
     FROM CALENDAR CHANGE
  ========================================= */

  const handleFromCalendarChange = (
    event
  ) => {

    const value =
      convertPickerDate(
        event.target.value
      );


    setFromDate(value);


    if (value) {

      setPeriod(
        "Custom Date Range"
      );

    }

  };


  /* =========================================
     TO CALENDAR CHANGE
  ========================================= */

  const handleToCalendarChange = (
    event
  ) => {

    const value =
      convertPickerDate(
        event.target.value
      );


    setToDate(value);


    if (value) {

      setPeriod(
        "Custom Date Range"
      );

    }

  };


  /* =========================================
     CLEAR DATE FILTER
  ========================================= */

  const clearDateFilter = () => {

    setFromDate("");

    setToDate("");

    setPeriod(
      "All Time"
    );

  };


  /* =========================================
     OPEN FROM CALENDAR
  ========================================= */

  const openFromCalendar = () => {

    if (
      fromDatePickerRef.current
    ) {

      fromDatePickerRef.current.showPicker();

    }

  };


  /* =========================================
     OPEN TO CALENDAR
  ========================================= */

  const openToCalendar = () => {

    if (
      toDatePickerRef.current
    ) {

      toDatePickerRef.current.showPicker();

    }

  };


  /* =========================================
     PERIOD FILTER
  ========================================= */

  const periodOrders =
    useMemo(() => {

      /* -----------------------------------------
         CUSTOM DATE RANGE
      ----------------------------------------- */

      if (
        fromDate ||
        toDate
      ) {

        const from =
          parseCustomDate(
            fromDate
          );


        const to =
          parseCustomDate(
            toDate
          );


        return orders.filter(
          (order) => {

            const date =
              parseOrderDate(
                getOrderDate(
                  order
                )
              );


            if (!date) {

              return false;

            }


            const orderDate =
              new Date(date);


            orderDate.setHours(
              0,
              0,
              0,
              0
            );


            if (
              from &&
              orderDate < from
            ) {

              return false;

            }


            if (
              to &&
              orderDate > to
            ) {

              return false;

            }


            return true;

          }
        );

      }


      /* -----------------------------------------
         ALL TIME
      ----------------------------------------- */

      if (
        period ===
        "All Time"
      ) {

        return orders;

      }


      return orders.filter(
        (order) => {

          const date =
            parseOrderDate(
              getOrderDate(
                order
              )
            );


          if (!date) {

            return false;

          }


          if (
            period ===
            "Today"
          ) {

            return isToday(
              date
            );

          }


          if (
            period ===
            "This Week"
          ) {

            return isThisWeek(
              date
            );

          }


          if (
            period ===
            "This Month"
          ) {

            return isThisMonth(
              date
            );

          }


          return true;

        }
      );

    }, [
      orders,
      period,
      fromDate,
      toDate
    ]);


  /* =========================================
     SEARCH
  ========================================= */

  const filteredOrders =
    useMemo(() => {

      const searchText =
        search
          .toLowerCase()
          .trim();


      if (!searchText) {

        return periodOrders;

      }


      return periodOrders.filter(
        (order) => {

          const orderId =
            String(
              getOrderId(
                order
              )
            )
              .toLowerCase();


          const customer =
            String(
              getCustomerName(
                order
              )
            )
              .toLowerCase();


          const status =
            String(
              getStatus(
                order
              )
            )
              .toLowerCase();


          const email =
            String(
              order?.email ||
              ""
            )
              .toLowerCase();


          return (

            orderId.includes(
              searchText
            ) ||

            customer.includes(
              searchText
            ) ||

            status.includes(
              searchText
            ) ||

            email.includes(
              searchText
            )

          );

        }
      );

    }, [
      periodOrders,
      search
    ]);


  /* =========================================
     TOTAL ORDERS
  ========================================= */

  const totalOrders =
    periodOrders.length;


  /* =========================================
     TOTAL SALES
  ========================================= */

  const totalSales =
    periodOrders.reduce(
      (
        total,
        order
      ) => {

        return (
          total +
          getTotal(order)
        );

      },
      0
    );


  /* =========================================
     TOTAL CASES
  ========================================= */

  const totalCases =
    periodOrders.reduce(
      (
        total,
        order
      ) => {

        return (
          total +
          getCases(order)
        );

      },
      0
    );


  /* =========================================
     TOTAL ITEMS
  ========================================= */

  const totalItems =
    periodOrders.reduce(
      (
        total,
        order
      ) => {

        return (
          total +
          getItemCount(order)
        );

      },
      0
    );


  /* =========================================
     TOTAL CUSTOMERS
  ========================================= */

  const customerSet =
    new Set();


  periodOrders.forEach(
    (order) => {

      const customerKey =
        String(
          order?.customerId ||
          order?.shopId ||
          order?.email ||
          getCustomerName(
            order
          )
        )
          .trim()
          .toLowerCase();


      if (customerKey) {

        customerSet.add(
          customerKey
        );

      }

    }
  );


  const totalCustomers =
    customerSet.size;


  /* =========================================
     STATUS COUNTS
  ========================================= */

  const pendingOrders =
    periodOrders.filter(
      (order) =>
        getStatus(order)
          .toLowerCase() ===
        "pending"
    ).length;


  const confirmedOrders =
    periodOrders.filter(
      (order) =>
        getStatus(order)
          .toLowerCase() ===
        "confirmed"
    ).length;


  const processingOrders =
    periodOrders.filter(
      (order) =>
        getStatus(order)
          .toLowerCase() ===
        "processing"
    ).length;


  const shippedOrders =
    periodOrders.filter(
      (order) =>
        getStatus(order)
          .toLowerCase() ===
        "shipped"
    ).length;


  const deliveredOrders =
    periodOrders.filter(
      (order) =>
        getStatus(order)
          .toLowerCase() ===
        "delivered"
    ).length;


  const cancelledOrders =
    periodOrders.filter(
      (order) => {

        const status =
          getStatus(order)
            .toLowerCase();


        return (

          status ===
            "order cancelled" ||

          status ===
            "cancelled"

        );

      }
    ).length;


  /* =========================================
     ACTIVE ORDERS
  ========================================= */

  const activeOrders =
    pendingOrders +
    confirmedOrders +
    processingOrders +
    shippedOrders;


  /* =========================================
     AVERAGE ORDER VALUE
  ========================================= */

  const averageOrderValue =
    totalOrders > 0
      ? totalSales /
        totalOrders
      : 0;


  /* =========================================
     BEST PRODUCTS
  ========================================= */

  const bestProducts =
    useMemo(() => {

      const productMap = {};


      periodOrders.forEach(
        (order) => {

          const items =
            getItems(order);


          items.forEach(
            (item) => {

              const name =
                item?.productName ||
                item?.name ||
                "Product";


              const brand =
                item?.brandName ||
                item?.brand ||
                "Chocolate";


              const quantity =
                Number(
                  item?.quantity ||
                  item?.qty ||
                  0
                );


              const sellingPrice =
                Number(
                  item?.sellingPrice ||
                  item?.price ||
                  0
                );


              const amount =
                Number(
                  item?.totalAmount ||
                  item?.total ||
                  sellingPrice *
                    quantity
                );


              if (
                !productMap[name]
              ) {

                productMap[name] = {

                  name:
                    name,

                  brand:
                    brand,

                  sold:
                    0,

                  value:
                    0

                };

              }


              productMap[name].sold +=
                quantity;


              productMap[name].value +=
                amount;

            }
          );

        }
      );


      return Object.values(
        productMap
      )
        .sort(
          (a, b) =>
            b.sold -
            a.sold
        )
        .slice(
          0,
          5
        );

    }, [
      periodOrders
    ]);


  /* =========================================
     BRAND SALES
  ========================================= */

  const brandSales =
    useMemo(() => {

      const brandMap = {};


      periodOrders.forEach(
        (order) => {

          const items =
            getItems(order);


          const orderBrands =
            new Set();


          items.forEach(
            (item) => {

              const brand =
                item?.brandName ||
                item?.brand ||
                "Unknown";


              const quantity =
                Number(
                  item?.quantity ||
                  item?.qty ||
                  0
                );


              const sellingPrice =
                Number(
                  item?.sellingPrice ||
                  item?.price ||
                  0
                );


              const amount =
                Number(
                  item?.totalAmount ||
                  item?.total ||
                  sellingPrice *
                    quantity
                );


              if (
                !brandMap[brand]
              ) {

                brandMap[brand] = {

                  brand:
                    brand,

                  orders:
                    0,

                  value:
                    0

                };

              }


              brandMap[brand].value +=
                amount;


              orderBrands.add(
                brand
              );

            }
          );


          orderBrands.forEach(
            (brand) => {

              brandMap[brand].orders +=
                1;

            }
          );

        }
      );


      return Object.values(
        brandMap
      )
        .sort(
          (a, b) =>
            b.value -
            a.value
        )
        .slice(
          0,
          5
        );

    }, [
      periodOrders
    ]);


  /* =========================================
     OPEN REPORT
  ========================================= */

  const openReport = (type) => {

    let reportOrders =
      periodOrders;


    if (
      type ===
      "pending"
    ) {

      reportOrders =
        periodOrders.filter(
          (order) =>
            getStatus(order) ===
            "Pending"
        );

    }


    if (
      type ===
      "confirmed"
    ) {

      reportOrders =
        periodOrders.filter(
          (order) =>
            getStatus(order) ===
            "Confirmed"
        );

    }


    if (
      type ===
      "processing"
    ) {

      reportOrders =
        periodOrders.filter(
          (order) =>
            getStatus(order) ===
            "Processing"
        );

    }


    if (
      type ===
      "shipped"
    ) {

      reportOrders =
        periodOrders.filter(
          (order) =>
            getStatus(order) ===
            "Shipped"
        );

    }


    if (
      type ===
      "delivered"
    ) {

      reportOrders =
        periodOrders.filter(
          (order) =>
            getStatus(order) ===
            "Delivered"
        );

    }


    if (
      type ===
      "cancelled"
    ) {

      reportOrders =
        periodOrders.filter(
          (order) => {

            const status =
              getStatus(order);


            return (

              status ===
                "Order Cancelled" ||

              status ===
                "Cancelled"

            );

          }
        );

    }


    if (
      type ===
      "active-orders"
    ) {

      reportOrders =
        periodOrders.filter(
          (order) => {

            return [

              "Pending",

              "Confirmed",

              "Processing",

              "Shipped"

            ].includes(
              getStatus(order)
            );

          }
        );

    }


    setSelectedReport({

      type:
        type,

      orders:
        reportOrders

    });

  };


  /* =========================================
     REPORT TITLE
  ========================================= */

  const getReportTitle = (type) => {

    const titles = {

      "total-orders":
        "Total Orders",

      "total-sales":
        "Total Sales",

      "total-cases":
        "Total Cases",

      "active-orders":
        "Active Orders",

      "pending":
        "Pending Orders",

      "confirmed":
        "Confirmed Orders",

      "processing":
        "Processing Orders",

      "shipped":
        "Shipped Orders",

      "delivered":
        "Delivered Orders",

      "cancelled":
        "Cancelled Orders"

    };


    return (

      titles[type] ||

      "Report"

    );

  };


  /* =========================================
     REPORT VALUE
  ========================================= */

  const getReportValue = (
    type,
    reportOrders
  ) => {

    if (
      type ===
      "total-sales"
    ) {

      const value =
        reportOrders.reduce(
          (
            total,
            order
          ) =>
            total +
            getTotal(order),
          0
        );


      return `₹${value.toLocaleString(
        "en-IN",
        {
          maximumFractionDigits:
            2
        }
      )}`;

    }


    if (
      type ===
      "total-cases"
    ) {

      return reportOrders.reduce(
        (
          total,
          order
        ) =>
          total +
          getCases(order),
        0
      );

    }


    return reportOrders.length;

  };


  /* =========================================
     EXPORT CSV
  ========================================= */

  const handleExport = () => {

    if (
      filteredOrders.length ===
      0
    ) {

      alert(
        "No report data available."
      );

      return;

    }


    const header =
      "Order ID,Customer,Date,Status,Items,Cases,Amount\n";


    const rows =
      filteredOrders
        .map(
          (order) =>
            `"${getOrderId(order)}","${getCustomerName(
              order
            )}","${formatDateTime(
              getOrderDate(order)
            )}","${getStatus(
              order
            )}","${getItemCount(
              order
            )}","${getCases(
              order
            )}","${getTotal(
              order
            )}"`
        )
        .join("\n");


    const csv =
      header +
      rows;


    const blob =
      new Blob(
        [csv],
        {
          type:
            "text/csv;charset=utf-8;"
        }
      );


    const url =
      URL.createObjectURL(
        blob
      );


    const link =
      document.createElement(
        "a"
      );


    link.href =
      url;


    link.download =
      "Sai-Charitha-Agencies-Report.csv";


    document.body.appendChild(
      link
    );


    link.click();


    document.body.removeChild(
      link
    );


    URL.revokeObjectURL(
      url
    );

  };


  /* =========================================
     CLOSE REPORT
  ========================================= */

  const closeReport = () => {

    setSelectedReport(null);

  };


  /* =========================================
     UI
  ========================================= */

  return (

    <div className="reports-page">


      {/* =====================================
          HEADER
      ===================================== */}

      <div className="reports-header">

        <div className="reports-heading">

          <button
            className="reports-back-button"
            onClick={() =>
              navigate(
                "/admin-dashboard"
              )
            }
          >

            <FaArrowLeft />

          </button>


          <div>

            <p className="reports-small-title">

              SAI CHARITHA AGENCIES

            </p>


            <h1
              className="reports-main-title"
              style={{
                display:
                  "block",

                visibility:
                  "visible",

                opacity:
                  1,

                color:
                  "#42190d",

                fontSize:
                  "42px",

                fontWeight:
                  "800",

                lineHeight:
                  "1.2",

                margin:
                  "5px 0 8px"
              }}
            >

              Reports

            </h1>


            <p>

              View business and order
              performance reports

            </p>

          </div>

        </div>


        <div className="reports-icon-large">

          <FaChartBar />

        </div>

      </div>



      {/* =====================================
          PERIOD FILTER
      ===================================== */}

      <div
        style={{
          display:
            "flex",

          justifyContent:
            "space-between",

          alignItems:
            "center",

          gap:
            "15px",

          marginBottom:
            "25px",

          flexWrap:
            "wrap"
        }}
      >

        <div>

          <span
            className="reports-small-title"
            style={{
              fontSize:
                "11px"
            }}
          >

            REPORT PERIOD

          </span>


          <h2
            style={{
              margin:
                "5px 0 0"
            }}
          >

            Business Overview

          </h2>

        </div>


        <div
          style={{
            display:
              "flex",

            gap:
              "8px",

            flexWrap:
              "wrap"
          }}
        >

          {[
            "Today",
            "This Week",
            "This Month",
            "All Time"
          ].map(
            (item) => (

              <button
                key={item}
                onClick={() => {

                  setPeriod(
                    item
                  );

                  setFromDate("");

                  setToDate("");

                }}
                style={{
                  padding:
                    "9px 15px",

                  borderRadius:
                    "10px",

                  border:
                    "1px solid #ead8c8",

                  background:
                    period ===
                    item
                      ? "#42190d"
                      : "#ffffff",

                  color:
                    period ===
                    item
                      ? "#ffffff"
                      : "#42190d",

                  cursor:
                    "pointer",

                  fontWeight:
                    "600"
                }}
              >

                {item}

              </button>

            )
          )}

        </div>

      </div>



      {/* =====================================
          DATE RANGE FILTER
      ===================================== */}

      <div
        style={{
          display:
            "flex",

          alignItems:
            "center",

          gap:
            "10px",

          flexWrap:
            "wrap",

          marginBottom:
            "25px",

          padding:
            "15px",

          background:
            "#fffaf6",

          border:
            "1px solid #ead8c8",

          borderRadius:
            "14px"
        }}
      >

        {/* FROM DATE */}

        <div
          style={{
            display:
              "flex",

            alignItems:
              "center",

            gap:
              "8px",

            padding:
              "10px 12px",

            border:
              "1px solid #ead8c8",

            borderRadius:
              "10px",

            background:
              "#ffffff"
          }}
        >

          <span
            style={{
              fontWeight:
                "700",

              color:
                "#42190d",

              fontSize:
                "13px",

              whiteSpace:
                "nowrap"
            }}
          >

            From Date

          </span>


          <input
            type="text"
            value={fromDate}
            onChange={
              handleFromDateChange
            }
            placeholder="dd-mm-yyyy"
            maxLength={10}
            style={{
              width:
                "105px",

              border:
                "none",

              outline:
                "none",

              background:
                "transparent",

              color:
                "#42190d",

              fontSize:
                "14px",

              fontWeight:
                "600"
            }}
          />


          <button
            type="button"
            onClick={
              openFromCalendar
            }
            style={{
              border:
                "none",

              background:
                "transparent",

              color:
                "#42190d",

              cursor:
                "pointer",

              padding:
                "3px",

              fontSize:
                "16px",

              display:
                "flex",

              alignItems:
                "center"
            }}
            title="Select From Date"
          >

            <FaCalendarAlt />

          </button>


          <input
            ref={
              fromDatePickerRef
            }
            type="date"
            onChange={
              handleFromCalendarChange
            }
            style={{
              position:
                "absolute",

              width:
                "1px",

              height:
                "1px",

              opacity:
                0,

              pointerEvents:
                "none"
            }}
          />

        </div>



        {/* TO DATE */}

        <div
          style={{
            display:
              "flex",

            alignItems:
              "center",

            gap:
              "8px",

            padding:
              "10px 12px",

            border:
              "1px solid #ead8c8",

            borderRadius:
              "10px",

            background:
              "#ffffff"
          }}
        >

          <span
            style={{
              fontWeight:
                "700",

              color:
                "#42190d",

              fontSize:
                "13px",

              whiteSpace:
                "nowrap"
            }}
          >

            To Date

          </span>


          <input
            type="text"
            value={toDate}
            onChange={
              handleToDateChange
            }
            placeholder="dd-mm-yyyy"
            maxLength={10}
            style={{
              width:
                "105px",

              border:
                "none",

              outline:
                "none",

              background:
                "transparent",

              color:
                "#42190d",

              fontSize:
                "14px",

              fontWeight:
                "600"
            }}
          />


          <button
            type="button"
            onClick={
              openToCalendar
            }
            style={{
              border:
                "none",

              background:
                "transparent",

              color:
                "#42190d",

              cursor:
                "pointer",

              padding:
                "3px",

              fontSize:
                "16px",

              display:
                "flex",

              alignItems:
                "center"
            }}
            title="Select To Date"
          >

            <FaCalendarAlt />

          </button>


          <input
            ref={
              toDatePickerRef
            }
            type="date"
            onChange={
              handleToCalendarChange
            }
            style={{
              position:
                "absolute",

              width:
                "1px",

              height:
                "1px",

              opacity:
                0,

              pointerEvents:
                "none"
            }}
          />

        </div>



        {/* CLEAR DATE */}

        {(fromDate ||
          toDate) && (

          <button
            type="button"
            onClick={
              clearDateFilter
            }
            style={{
              display:
                "flex",

              alignItems:
                "center",

              gap:
                "7px",

              padding:
                "10px 15px",

              border:
                "none",

              borderRadius:
                "10px",

              background:
                "#42190d",

              color:
                "#ffffff",

              cursor:
                "pointer",

              fontWeight:
                "700"
            }}
          >

            <FaTimes />

            Clear Dates

          </button>

        )}

      </div>



      {/* =====================================
          SEARCH
      ===================================== */}

      <div
        style={{
          display:
            "flex",

          justifyContent:
            "space-between",

          alignItems:
            "center",

          gap:
            "15px",

          marginBottom:
            "25px",

          flexWrap:
            "wrap"
        }}
      >

        <input
          type="text"
          placeholder=
            "Search order, customer, email or status..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          style={{
            width:
              "100%",

            maxWidth:
              "500px",

            padding:
              "12px 15px",

            border:
              "1px solid #ead8c8",

            borderRadius:
              "10px",

            outline:
              "none",

            fontSize:
              "14px"
          }}
        />


        <div
          style={{
            color:
              "#806f67",

            fontSize:
              "14px",

            display:
              "flex",

            alignItems:
              "center"
          }}
        >

          <FaCalendarAlt
            style={{
              marginRight:
                "7px"
            }}
          />


          {fromDate ||
          toDate ? (

            <span>

              {fromDate ||
                "Any Date"}

              {" - "}

              {toDate ||
                "Any Date"}

            </span>

          ) : (

            period

          )}

        </div>

      </div>



      {/* =====================================
          MAIN STATS
      ===================================== */}

      <div className="reports-stat-grid">


        <button
          className=
            "report-stat-card report-clickable"
          onClick={() =>
            openReport(
              "total-orders"
            )
          }
        >

          <div className="report-stat-icon">

            <FaShoppingCart />

          </div>


          <div className="report-stat-content">

            <span>

              Total Orders

            </span>


            <h2>

              {loading
                ? "..."
                : totalOrders}

            </h2>

          </div>


          <FaArrowRight
            className=
              "report-card-arrow"
          />

        </button>



        <button
          className=
            "report-stat-card report-clickable"
          onClick={() =>
            openReport(
              "total-sales"
            )
          }
        >

          <div className="report-stat-icon">

            <FaRupeeSign />

          </div>


          <div className="report-stat-content">

            <span>

              Total Sales

            </span>


            <h2>

              {loading
                ? "..."
                : `₹${totalSales.toLocaleString(
                    "en-IN",
                    {
                      maximumFractionDigits:
                        2
                    }
                  )}`}

            </h2>

          </div>


          <FaArrowRight
            className=
              "report-card-arrow"
          />

        </button>



        <button
          className=
            "report-stat-card report-clickable"
          onClick={() =>
            openReport(
              "total-cases"
            )
          }
        >

          <div className="report-stat-icon">

            <FaBox />

          </div>


          <div className="report-stat-content">

            <span>

              Total Cases

            </span>


            <h2>

              {loading
                ? "..."
                : totalCases}

            </h2>

          </div>


          <FaArrowRight
            className=
              "report-card-arrow"
          />

        </button>



        <button
          className=
            "report-stat-card report-clickable"
          onClick={() =>
            openReport(
              "active-orders"
            )
          }
        >

          <div className="report-stat-icon">

            <FaClock />

          </div>


          <div className="report-stat-content">

            <span>

              Active Orders

            </span>


            <h2>

              {loading
                ? "..."
                : activeOrders}

            </h2>

          </div>


          <FaArrowRight
            className=
              "report-card-arrow"
          />

        </button>

      </div>



      {/* =====================================
          EXTRA STATS
      ===================================== */}

      <div
        className="reports-stat-grid"
        style={{
          marginTop:
            "20px",

          marginBottom:
            "45px"
        }}
      >

        <div className="report-stat-card">

          <div className="report-stat-icon">

            <FaUsers />

          </div>


          <div>

            <span>

              Total Customers

            </span>


            <h2>

              {loading
                ? "..."
                : totalCustomers}

            </h2>

          </div>

        </div>



        <div className="report-stat-card">

          <div className="report-stat-icon">

            <FaBox />

          </div>


          <div>

            <span>

              Items Sold

            </span>


            <h2>

              {loading
                ? "..."
                : totalItems}

            </h2>

          </div>

        </div>



        <div className="report-stat-card">

          <div className="report-stat-icon">

            <FaChartLine />

          </div>


          <div>

            <span>

              Average Order Value

            </span>


            <h2>

              {loading
                ? "..."
                : `₹${averageOrderValue.toLocaleString(
                    "en-IN",
                    {
                      maximumFractionDigits:
                        2
                    }
                  )}`}

            </h2>

          </div>

        </div>



        <div className="report-stat-card">

          <div className="report-stat-icon">

            <FaCheckCircle />

          </div>


          <div>

            <span>

              Delivered Orders

            </span>


            <h2>

              {loading
                ? "..."
                : deliveredOrders}

            </h2>

          </div>

        </div>

      </div>



      {/* =====================================
          ORDER STATUS
      ===================================== */}

      <section className="reports-section">

        <div className="reports-section-heading">

          <span>

            ORDER ANALYSIS

          </span>

          <h2>

            Order Status Report

          </h2>

        </div>


        <div className="order-report-grid">


          <button
            className=
              "status-report-card status-clickable"
            onClick={() =>
              openReport(
                "pending"
              )
            }
          >

            <div
              className=
                "status-report-icon pending"
            >

              <FaClock />

            </div>


            <div>

              <span>

                Pending Orders

              </span>


              <h3>

                {loading
                  ? "..."
                  : pendingOrders}

              </h3>

            </div>


            <FaArrowRight
              className=
                "report-card-arrow"
            />

          </button>



          <button
            className=
              "status-report-card status-clickable"
            onClick={() =>
              openReport(
                "confirmed"
              )
            }
          >

            <div
              className=
                "status-report-icon confirmed"
            >

              <FaCheckCircle />

            </div>


            <div>

              <span>

                Confirmed Orders

              </span>


              <h3>

                {loading
                  ? "..."
                  : confirmedOrders}

              </h3>

            </div>


            <FaArrowRight
              className=
                "report-card-arrow"
            />

          </button>



          <button
            className=
              "status-report-card status-clickable"
            onClick={() =>
              openReport(
                "processing"
              )
            }
          >

            <div
              className=
                "status-report-icon processing"
            >

              <FaBox />

            </div>


            <div>

              <span>

                Processing Orders

              </span>


              <h3>

                {loading
                  ? "..."
                  : processingOrders}

              </h3>

            </div>


            <FaArrowRight
              className=
                "report-card-arrow"
            />

          </button>



          <button
            className=
              "status-report-card status-clickable"
            onClick={() =>
              openReport(
                "shipped"
              )
            }
          >

            <div
              className=
                "status-report-icon shipped"
            >

              <FaTruck />

            </div>


            <div>

              <span>

                Shipped Orders

              </span>


              <h3>

                {loading
                  ? "..."
                  : shippedOrders}

              </h3>

            </div>


            <FaArrowRight
              className=
                "report-card-arrow"
            />

          </button>



          <button
            className=
              "status-report-card status-clickable"
            onClick={() =>
              openReport(
                "delivered"
              )
            }
          >

            <div
              className=
                "status-report-icon delivered"
            >

              <FaCheckCircle />

            </div>


            <div>

              <span>

                Delivered Orders

              </span>


              <h3>

                {loading
                  ? "..."
                  : deliveredOrders}

              </h3>

            </div>


            <FaArrowRight
              className=
                "report-card-arrow"
            />

          </button>



          <button
            className=
              "status-report-card status-clickable"
            onClick={() =>
              openReport(
                "cancelled"
              )
            }
          >

            <div
              className=
                "status-report-icon cancelled"
            >

              <FaTimesCircle />

            </div>


            <div>

              <span>

                Cancelled Orders

              </span>


              <h3>

                {loading
                  ? "..."
                  : cancelledOrders}

              </h3>

            </div>


            <FaArrowRight
              className=
                "report-card-arrow"
            />

          </button>

        </div>

      </section>



      {/* =====================================
          ORDER TABLE
      ===================================== */}

      <section className="reports-section">

        <div className="reports-section-heading">

          <span>

            SALES REPORT

          </span>

          <h2>

            Order Performance

          </h2>

        </div>


        <div
          style={{
            background:
              "#ffffff",

            border:
              "1px solid #ead8c8",

            borderRadius:
              "18px",

            overflowX:
              "auto",

            boxShadow:
              "0 8px 22px rgba(66,25,13,0.06)"
          }}
        >

          <table
            style={{
              width:
                "100%",

              borderCollapse:
                "collapse",

              minWidth:
                "850px"
            }}
          >

            <thead>

              <tr
                style={{
                  background:
                    "#42190d",

                  color:
                    "#ffffff"
                }}
              >

                <th style={tableHeaderStyle}>

                  Order ID

                </th>

                <th style={tableHeaderStyle}>

                  Customer

                </th>

                <th style={tableHeaderStyle}>

                  Date

                </th>

                <th style={tableHeaderStyle}>

                  Items

                </th>

                <th style={tableHeaderStyle}>

                  Status

                </th>

                <th style={tableHeaderStyle}>

                  Total

                </th>

              </tr>

            </thead>


            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan="6"
                    style={
                      emptyTableStyle
                    }
                  >

                    Loading report data...

                  </td>

                </tr>

              ) : filteredOrders.length >
                0 ? (

                filteredOrders.map(
                  (order) => (

                    <tr
                      key={
                        getOrderId(
                          order
                        )
                      }
                    >

                      <td style={tableCellStyle}>

                        <strong>

                          {getOrderId(
                            order
                          )}

                        </strong>

                      </td>


                      <td style={tableCellStyle}>

                        {getCustomerName(
                          order
                        )}

                      </td>


                      <td style={tableCellStyle}>

                        {formatDate(
                          getOrderDate(
                            order
                          )
                        )}

                      </td>


                      <td style={tableCellStyle}>

                        {getItemCount(
                          order
                        )}

                      </td>


                      <td style={tableCellStyle}>

                        {getStatus(
                          order
                        )}

                      </td>


                      <td style={tableCellStyle}>

                        <strong>

                          ₹
                          {getTotal(
                            order
                          ).toLocaleString(
                            "en-IN",
                            {
                              maximumFractionDigits:
                                2
                            }
                          )}

                        </strong>

                      </td>

                    </tr>

                  )

                )

              ) : (

                <tr>

                  <td
                    colSpan="6"
                    style={
                      emptyTableStyle
                    }
                  >

                    No orders found for{" "}

                    {period}.

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </section>



      {/* =====================================
          BEST PRODUCTS
      ===================================== */}

      <section className="reports-section">

        <div className="reports-section-heading">

          <span>

            TOP PRODUCTS

          </span>

          <h2>

            Best Selling Products

          </h2>

        </div>


        <div className="order-report-grid">

          {bestProducts.length >
          0 ? (

            bestProducts.map(
              (
                product,
                index
              ) => (

                <div
                  className=
                    "status-report-card"
                  key={
                    product.name
                  }
                >

                  <div
                    className=
                      "status-report-icon delivered"
                  >

                    <FaTrophy />

                  </div>


                  <div>

                    <span>

                      #{index + 1}{" "}

                      {product.brand}

                    </span>


                    <h3>

                      {product.name}

                    </h3>


                    <span>

                      {product.sold} sold

                    </span>

                  </div>

                </div>

              )

            )

          ) : (

            <div
              className=
                "status-report-card"
            >

              No product sales data.

            </div>

          )}

        </div>

      </section>



      {/* =====================================
          BRAND SALES
      ===================================== */}

      <section className="reports-section">

        <div className="reports-section-heading">

          <span>

            BRAND PERFORMANCE

          </span>

          <h2>

            Brand-wise Sales

          </h2>

        </div>


        <div className="order-report-grid">

          {brandSales.length >
          0 ? (

            brandSales.map(
              (brand) => (

                <div
                  className=
                    "status-report-card"
                  key={
                    brand.brand
                  }
                >

                  <div
                    className=
                      "status-report-icon confirmed"
                  >

                    <FaTags />

                  </div>


                  <div>

                    <span>

                      {brand.orders} Orders

                    </span>


                    <h3>

                      ₹
                      {brand.value.toLocaleString(
                        "en-IN",
                        {
                          maximumFractionDigits:
                            2
                        }
                      )}

                    </h3>


                    <span>

                      {brand.brand}

                    </span>

                  </div>

                </div>

              )

            )

          ) : (

            <div
              className=
                "status-report-card"
            >

              No brand sales data.

            </div>

          )}

        </div>

      </section>



      {/* =====================================
          EXPORT
      ===================================== */}

      <div
        style={{
          display:
            "flex",

          justifyContent:
            "flex-end",

          marginBottom:
            "40px"
        }}
      >

        <button
          onClick={
            handleExport
          }
          style={{
            border:
              "none",

            background:
              "#42190d",

            color:
              "#ffffff",

            padding:
              "12px 20px",

            borderRadius:
              "10px",

            cursor:
              "pointer",

            fontWeight:
              "700"
          }}
        >

          <FaChartBar
            style={{
              marginRight:
                "8px"
            }}
          />

          Export Report

        </button>

      </div>



      {/* =====================================
          BUSINESS PERFORMANCE
      ===================================== */}

      <div className="reports-bottom-card">

        <div className="reports-bottom-icon">

          <FaStore />

        </div>


        <div>

          <h2>

            Business Performance

          </h2>


          <p>

            Your reports are automatically
            calculated from the orders
            received through the customer
            ordering system.

          </p>

        </div>

      </div>



      {/* =====================================
          REPORT MODAL
      ===================================== */}

      {selectedReport && (

        <div
          className=
            "reports-modal-overlay"
          onClick={
            closeReport
          }
        >

          <div
            className=
              "reports-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div
              className=
                "reports-modal-header"
            >

              <div>

                <span>

                  REPORT DETAILS

                </span>


                <h2>

                  {getReportTitle(
                    selectedReport.type
                  )}

                </h2>

              </div>


              <button
                className=
                  "reports-modal-close"
                onClick={
                  closeReport
                }
              >

                <FaTimes />

              </button>

            </div>



            <div
              className=
                "reports-modal-summary"
            >

              <div>

                <span>

                  Total

                </span>


                <strong>

                  {getReportValue(
                    selectedReport.type,
                    selectedReport.orders
                  )}

                </strong>

              </div>

            </div>



            <div
              className=
                "reports-modal-orders"
            >

              <div
                className=
                  "reports-modal-orders-heading"
              >

                <h3>

                  <FaShoppingCart
                    style={{
                      marginRight:
                        "8px"
                    }}
                  />

                  Orders

                </h3>


                <span>

                  {
                    selectedReport
                      .orders
                      .length
                  }{" "}

                  Orders

                </span>

              </div>



              {selectedReport.orders.length >

              0 ? (

                <div
                  className=
                    "reports-order-list"
                >

                  {selectedReport.orders.map(
                    (order) => (

                      <div
                        className=
                          "reports-order-item"
                        key={
                          getOrderId(
                            order
                          )
                        }
                      >

                        <div
                          className=
                            "reports-order-main"
                        >

                          <strong>

                            {getOrderId(
                              order
                            )}

                          </strong>


                          <span>

                            {getCustomerName(
                              order
                            )}

                          </span>


                          <span>

                            {formatDateTime(
                              getOrderDate(
                                order
                              )
                            )}

                          </span>

                        </div>



                        <div
                          className=
                            "reports-order-right"
                        >

                          <span
                            className=
                              "reports-order-status"
                          >

                            {getStatus(
                              order
                            )}

                          </span>


                          <strong>

                            ₹
                            {getTotal(
                              order
                            ).toLocaleString(
                              "en-IN",
                              {
                                maximumFractionDigits:
                                  2
                              }
                            )}

                          </strong>


                          <button
                            className=
                              "reports-view-order-btn"
                            onClick={() =>
                              navigate(
                                `/admin/orders/${order.id}`
                              )
                            }
                          >

                            <FaEye />

                            View

                          </button>

                        </div>

                      </div>

                    )
                  )}

                </div>

              ) : (

                <div
                  className=
                    "reports-modal-empty"
                >

                  <FaBoxes />

                  <span>

                    No orders found.

                  </span>

                </div>

              )}

            </div>



            <div
              className=
                "reports-modal-footer"
            >

              <button
                onClick={
                  closeReport
                }
              >

                <FaTimes />

                Close

              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}


/* =========================================
   TABLE STYLES
========================================= */

const tableHeaderStyle = {

  padding:
    "14px 16px",

  textAlign:
    "left",

  fontSize:
    "12px",

  letterSpacing:
    "0.5px"

};


const tableCellStyle = {

  padding:
    "15px 16px",

  borderBottom:
    "1px solid #ead8c8",

  color:
    "#5d463c",

  fontSize:
    "13px"

};


const emptyTableStyle = {

  padding:
    "35px",

  textAlign:
    "center",

  color:
    "#927f76"

};


export default Reports;