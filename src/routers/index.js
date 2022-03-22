import React from "react";
import loadable from "@loadable/component";
import Loading from "@/components/stateless/Loading";

const Home = loadable(() => import("../pages/home"), { fallback: <Loading /> });


const rootRouter = [{
  path: '/',
  name: '首页',
  key: '/',
  element: <Home />,
  children: []
}]

export default rootRouter
