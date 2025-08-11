#pragma once
#include "crow.h"
#include <string>

struct Cors {
  struct context {};

  std::string allow_origin = "*";
  std::string allow_methods = "GET,POST,OPTIONS";
  std::string allow_headers = "Content-Type,Authorization";
  std::string expose_headers = "";
  std::string max_age = "600";

  void set_origin(const std::string& origin) { allow_origin = origin; }

  void before_handle(crow::request& req, crow::response& res, context&) {
    if (req.method == crow::HTTPMethod::Options) {
      res.add_header("Access-Control-Allow-Origin", allow_origin);
      res.add_header("Access-Control-Allow-Methods", allow_methods);
      res.add_header("Access-Control-Allow-Headers", allow_headers);
      res.add_header("Access-Control-Max-Age", max_age);
      res.code = 204;
      res.end();
    }
  }

  void after_handle(crow::request&, crow::response& res, context&) {
    res.add_header("Access-Control-Allow-Origin", allow_origin);
    res.add_header("Vary", "Origin");
    res.add_header("Access-Control-Allow-Credentials", "true");
    if (!expose_headers.empty())
      res.add_header("Access-Control-Expose-Headers", expose_headers);
  }
};
