export const checkAuth = (router) => {
  const doctorId = localStorage.getItem('doctor_id');
  const accessToken = localStorage.getItem('access_token');

  if (!doctorId || !accessToken) {
    router.push('/login');
    return null;
  }
  return { doctorId, accessToken };
};

export const getLast30DaysDates = () => {
  const dates = [];
  const today = new Date();

  for (let i = 29; i >= 0; i--) {
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - i); // Subtract days to get past dates
    dates.push(pastDate.toISOString().split("T")[0] + "T00:00:00.000Z"); // Format for chart
  }

  return dates;
}

export const getLast12Months = () => {
  const months = [];
  const today = new Date();

  for (let i = 11; i >= 0; i--) {
    const pastDate = new Date(today);
    pastDate.setMonth(today.getMonth() - i); // Move back by i months

    const year = pastDate.getFullYear();
    const month = String(pastDate.getMonth() + 1).padStart(2, "0"); // Ensure 2-digit format

    months.push(`${year}-${month}-01T00:00:00.000Z`); // Standard format
  }

  return months;
}

export const getLast6Months = () => {
  const months = [];
  const today = new Date();

  for (let i = 5; i >= 0; i--) {
    const pastDate = new Date(today);
    pastDate.setMonth(today.getMonth() - i); // Move back by i months

    const year = pastDate.getFullYear();
    const month = String(pastDate.getMonth() + 1).padStart(2, "0"); // Ensure 2-digit format

    months.push(`${year}-${month}-01T00:00:00.000Z`); // Standard format
  }

  return months;
}

export const getLast24Hours = () => {
  const hours = [];
  const today = new Date();

  for (let i = 23; i >= 0; i--) {
    const pastDate = new Date(today);
    pastDate.setHours(today.getHours() - i); // Subtract hours
    pastDate.setMinutes(0, 0, 0); // Set minutes, seconds, and milliseconds to 0

    hours.push(pastDate.toISOString()); // ISO format
  }

  return hours;
}

export const getDateFormate = (date) => {
  if (!date) return "";

  const d = new Date(date);
  if (isNaN(d.getTime())) return "";

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
};


export const getStatusStyle = (status) => {
  const statusColors = {
    "pending": { color: "#ff9800", backgroundColor: "#ffe0b2" },      
    "confirmed": { color: "#1976d2", backgroundColor: "#bbdefb" },    
    "processing": { color: "#9c27b0", backgroundColor: "#e1bee7" },   
    "shipped": { color: "#0288d1", backgroundColor: "#b3e5fc" },      
    "delivered": { color: "#4caf50", backgroundColor: "#c8e6c9" },    
    "cancelled": { color: "#e53935", backgroundColor: "#ffcdd2" },    
    "default": { color: "#000", backgroundColor: "#ddd" },             
  };

  const baseStyle = {      
    borderRadius: "12px",
    fontWeight: "500",
    fontSize: "0.875rem",
    display: "inline-block",
    textAlign: "center",
    width: "120px", 
    boxSizing: "border-box",
  };

  return { ...baseStyle, ...(statusColors[status] || statusColors.default) };
};



export const getAmountStyle = (status) => {
  const statusColors = {
    "Billed": { color: "#34bd68", },
    "Unbilled": { color: "#ff5656" },
    "Partially Paid": { color: "#dfad2b" },
    "default": { color: "#000" },
  };

  return statusColors[status] || statusColors.default;
}