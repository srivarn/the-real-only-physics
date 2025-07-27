"use client";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

const SwaggerPage = () => {
  return <SwaggerUI url="/swagger.json" />;
};
export default SwaggerPage;
