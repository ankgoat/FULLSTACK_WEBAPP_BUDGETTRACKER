#pragma once
#include <crow.h>
using namespace std;

struct CORSHandler {
    void operator()(const crow::request& req, crow::response& res, function<void()> next) {
        res.add_header("Access-Control-Allow-Origin", "*");
        res.add_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.add_header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
        if (req.method == "OPTIONS"_method) {
            res.code = 204;
            res.end();
        } else {
            next();
        }
    }
};
