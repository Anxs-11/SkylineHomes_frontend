import {
  AuthBindings,
  Authenticated,
  
  Refine,
} from "@refinedev/core";


import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import {
  AccountCircleOutlined,
  
  PeopleAltOutlined,
  
  VillaOutlined,
  Dashboard

} from '@mui/icons-material'
import {
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
  ThemedLayoutV2,
} from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import axios, { AxiosRequestConfig } from "axios";
import { CredentialResponse } from "interfaces/google";

import {
  Login,
  Home,
  MyProfile,
  AllProperties,
  Agents,
  AgentProfile,
  EditProperty,
  CreateProperty,
  PropertyDetails
} from "pages";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { parseJwt } from "utils/parse-jwt";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";


const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (request.headers) {
    request.headers["Authorization"] = `Bearer ${token}`;
  } else {
    request.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return request;
});

function App() {
  const authProvider: AuthBindings = {
    login: async ({ credential }: CredentialResponse) => {
      const profileObj = credential ? parseJwt(credential) : null;

      
      if(profileObj){
        const response=await axios.post('https://skylinehomes.onrender.com/api/v1/users',{
          name:profileObj.name,
            email:profileObj.email,
            avatar:profileObj.picture,},
            {
           headers:{'Content-Type':'application/json' },
          
            }
             
        )
        // console.log(response);
        const {data}=await response;
        if(response.status===200){
         
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...profileObj,
            avatar: profileObj.picture,
            userid:data._id
          })
        );
        }
        else {
         return Promise.reject()
        } 
        localStorage.setItem("token", `${credential}`);
        return {
          success: true,
          redirectTo: "/",
        };
      }
      return {
        success: false,
      }
       
        // return Promise.resolve();
    },
    logout: async () => {
      const token = localStorage.getItem("token");

      if (token && typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        axios.defaults.headers.common = {};
        window.google?.accounts.id.revoke(token, () => {
          return {};
        });
      }

      return {
        success: true,
        redirectTo: "/login",
      };
    },
    onError: async (error) => {
      console.error(error);
      return { error };
    },
    check: async () => {
      const token = localStorage.getItem("token");

      if (token) {
        return {
          authenticated: true,
        };
      }

      return {
        authenticated: false,
        error: {
          message: "Check failed",
          name: "Token not found",
        },
        logout: true,
        redirectTo: "/login",
      };
    },
    getPermissions: async () => null,
    getIdentity: async () => {
      const user = localStorage.getItem("user");
      if (user) {
        return JSON.parse(user);
      }

      return null;
    },
  };

  return (
    <BrowserRouter>
      {/* <GitHubBanner /> */}
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <Refine
              dataProvider={dataProvider("https://skylinehomes.onrender.com/api/v1")}
              notificationProvider={notificationProvider}
              routerProvider={routerBindings}
              authProvider={authProvider}
              
              resources={[
                {
                  name: "Dashboard",
                  list: "Home",
                  icon: < Dashboard/>,
                },
                {
                  name: "properties",
                  list: AllProperties,
                  show:PropertyDetails,
                  edit:EditProperty,
                  create:CreateProperty,
                  icon: <VillaOutlined />,
                },
                {
                  name: "Agents",
                  list: Agents,
                  show:AgentProfile,
                  icon: <PeopleAltOutlined />,
                  
                },
                {
                  name: "MyProfile",
                  options:{
                    label:"MyProfile"
                  },
                  list: "my-profile",
                  icon: <AccountCircleOutlined />,
                  
                },


              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
              }}
            >
             
              
              <Routes>
                
                <Route 
                  element={
                    <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                      <ThemedLayoutV2 Header={() => <Header isSticky={true} />}>
                        <Outlet />
                      </ThemedLayoutV2>
                    </Authenticated>
                  }
                >
                  <Route path="/" element={<Home/>}/>
                  <Route  path="/properties" element={<AllProperties />} />
                  <Route  path="/properties/create" element={<CreateProperty />} />
                  <Route  path="properties/show/:id" element={<PropertyDetails />} />
                  <Route  path="properties/edit/:id" element={<EditProperty />} />
                  <Route path="/Home" element={<Home/>}/>
                  <Route path="/Agents" element={<Agents/>}/>
                  <Route path="/Agents/show/:id" element={<AgentProfile/>}/>
                  
                  <Route path="/my-profile" element={<MyProfile/>}/>
                  <Route path="*" element={<ErrorComponent />} />
                </Route>
                <Route
                  element={
                    <Authenticated fallback={<Outlet />}>
                      <NavigateToResource />
                    </Authenticated>
                  }
                >
                  <Route path="/login" element={<Login />} />
                </Route>
               
              </Routes>
                

              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
