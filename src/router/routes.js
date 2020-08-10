import DashboardLayout from "@/pages/Dashboard/Layout/DashboardLayout.vue";
import AuthLayout from "@/pages/Dashboard/Pages/AuthLayout.vue";

// Dashboard pages
import Dashboard from "@/pages/Dashboard/Dashboard.vue";

// Pages
import Login from "@/pages/Dashboard/Pages/Login.vue";
// import Register from "@/pages/Dashboard/Pages/Register.vue";
import Lock from "@/pages/Dashboard/Pages/Lock.vue";

// Components pages
import Buttons from "@/pages/Dashboard/Components/Buttons.vue";
import GridSystem from "@/pages/Dashboard/Components/GridSystem.vue";
import Panels from "@/pages/Dashboard/Components/Panels.vue";
import SweetAlert from "@/pages/Dashboard/Components/SweetAlert.vue";
import Notifications from "@/pages/Dashboard/Components/Notifications.vue";
import Icons from "@/pages/Dashboard/Components/Icons.vue";
import Typography from "@/pages/Dashboard/Components/Typography.vue";

// Forms pages
import RegularForms from "@/pages/Dashboard/Forms/RegularForms.vue";
import ExtendedForms from "@/pages/Dashboard/Forms/ExtendedForms.vue";
import ValidationForms from "@/pages/Dashboard/Forms/ValidationForms.vue";
import Wizard from "@/pages/Dashboard/Forms/Wizard.vue";

// TableList pages
import RegularTables from "@/pages/Dashboard/Tables/RegularTables.vue";
import ExtendedTables from "@/pages/Dashboard/Tables/ExtendedTables.vue";
import PaginatedTables from "@/pages/Dashboard/Tables/PaginatedTables.vue";

// Maps pages
import GoogleMaps from "@/pages/Dashboard/Maps/GoogleMaps.vue";
import FullScreenMap from "@/pages/Dashboard/Maps/FullScreenMap.vue";
import VectorMaps from "@/pages/Dashboard/Maps/VectorMaps.vue";

// Calendar
import Calendar from "@/pages/Dashboard/Calendar.vue";
// Charts
import Charts from "@/pages/Dashboard/Charts.vue";
import Widgets from "@/pages/Dashboard/Widgets.vue";

// CMS Pages
import Pages from "@/pages/CMS/Pages/Pages.vue";
import PageDetails from "@/pages/CMS/Pages/PageDetails.vue";
import Kiosks from "@/pages/KioskManagement/Kiosks/Kiosks.vue";
import KioskDetails from "@/pages/KioskManagement/Kiosks/KioskDetails.vue";
import PageVisits from "@/pages/CMS/PageVisits.vue";
import Emails from "@/pages/CMS/Emails.vue";
import Referrals from "@/pages/CMS/Referrals.vue";
import KioskReports from "@/pages/KioskManagement/Kiosks/KioskReports.vue";
import Register from "@/pages/Register.vue";

// import Login from "@/pages/Auth/Login.vue";

// import Videos from "@/pages/CMS/PageVisits.vue";


// Kiosk Management Pages

let componentsMenu = {
  path: "/components",
  component: DashboardLayout,
  redirect: "/components/buttons",
  name: "Components",
  children: [
    {
      path: "buttons",
      name: "Buttons",
      components: { default: Buttons }
    },
    {
      path: "grid-system",
      name: "Grid System",
      components: { default: GridSystem }
    },
    {
      path: "panels",
      name: "Panels",
      components: { default: Panels }
    },
    {
      path: "sweet-alert",
      name: "Sweet Alert",
      components: { default: SweetAlert }
    },
    {
      path: "notifications",
      name: "Notifications",
      components: { default: Notifications }
    },
    {
      path: "icons",
      name: "Icons",
      components: { default: Icons }
    },
    {
      path: "typography",
      name: "Typography",
      components: { default: Typography }
    }
  ]
};
let formsMenu = {
  path: "/forms",
  component: DashboardLayout,
  redirect: "/forms/regular",
  name: "Forms",
  children: [
    {
      path: "regular",
      name: "Regular Forms",
      components: { default: RegularForms }
    },
    {
      path: "extended",
      name: "Extended Forms",
      components: { default: ExtendedForms }
    },
    {
      path: "validation",
      name: "Validation Forms",
      components: { default: ValidationForms }
    },
    {
      path: "wizard",
      name: "Wizard",
      components: { default: Wizard }
    }
  ],
  meta: {
    requiresAuth: true
  }
};

let tablesMenu = {
  path: "/table-list",
  component: DashboardLayout,
  redirect: "/table-list/regular",
  name: "Tables",
  children: [
    {
      path: "regular",
      name: "Regular Tables",
      components: { default: RegularTables }
    },
    {
      path: "extended",
      name: "Extended Tables",
      components: { default: ExtendedTables }
    },
    {
      path: "paginated",
      name: "Pagianted Tables",
      components: { default: PaginatedTables }
    }
  ],
  meta: {
    requiresAuth: true
  }
};

let pagesMenu = {
  path: "/pages",
  component: DashboardLayout,
  name: "Pages",
  redirect: "/",
  children: [
    {
      path: "/",
      name: "Pages",
      components: { default: Pages }
    },
    {
      path: ":page_id",
      name: "Page Details",
      components: { default: PageDetails }
    }
  ],
  meta: {
    requiresAuth: true
  }
};

let kiosksMenu = {
  path: "/kiosks",
  component: DashboardLayout,
  name: "Kiosks",
  redirect: "/",
  children: [
    {
      path: "/",
      name: "Kiosks",
      components: { default: Kiosks }
    },
    {
      path: ":kiosk_id",
      name: "Kiosk Details",
      components: { default: KioskDetails }
    },
    {
      path: "/reports/:kiosk_id",
      name: "Kiosk Reports",
      components: { default: KioskReports }
    }
  ],
  meta: {
    requiresAuth: true
  }
};


let pageVisits = {
  path: "/pagevisits",
  component: DashboardLayout,
  name: "PageVisits",
  redirect: "/",
  children: [
    {
      path: "/",
      name: "Page Visits",
      components: { default: PageVisits }
    }
  ],
  meta: {
    requiresAuth: true
  },
  meta: {
    requiresAuth: true
  }
};

let emails = {
  path: "/emails",
  component: DashboardLayout,
  name: "emails",
  redirect: "/",
  children: [
    {
      path: "/",
      name: "Emails",
      components: { default: Emails }
    },
    {
      path: ":id",
      name: "Specific Emails",
      components: { default: Emails }
    }
  ],
  meta: {
    requiresAuth: true
  }
};

let referrals = {
  path: "/referrals",
  component: DashboardLayout,
  name: "referrals",
  redirect: "/",
  children: [
    {
      path: "/",
      name: "Referrals",
      components: { default: Referrals }
    }
  ],
  meta: {
    requiresAuth: true
  }
};

let register = {
  path: "/register",
  component: DashboardLayout,
  name: "register",
  redirect: "/",
  children: [
    {
      path: "/",
      name: "register",
      components: { default: Register }
    }
  ],
  meta: {
    requiresAuth: true
  }
};


let authPages = {
  path: "/",
  component: AuthLayout,
  name: "Authentication",
  children: [
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    // {
    //   path: "/register",
    //   name: "Register",
    //   component: Register
    // },
    // {
    //   path: "/pricing",
    //   name: "Pricing",
    //   component: Pricing
    // },
    {
      path: "/lock",
      name: "Lock",
      component: Lock
    }
  ]
};

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    name: "Home"
  },
  {
    path: "*",
    redirect: "/dashboard",
    name: "Home"
  },
  componentsMenu,
  formsMenu,
  tablesMenu,
  // mapsMenu,
  pagesMenu,
  kiosksMenu,
  authPages,
  pageVisits,
  emails,
  authPages,
  referrals,
  register,
  {
    path: "/",
    component: DashboardLayout,
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        components: { default: Dashboard },
        meta: {
          requiresAuth: true
        }
      }
    ],
    meta: {
      requiresAuth: true
    }
  }
];

export default routes;
