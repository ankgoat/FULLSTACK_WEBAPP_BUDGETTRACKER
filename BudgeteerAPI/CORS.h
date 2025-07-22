#pragma once
#include <crow.h>

struct CORS {
    struct context {};
    
    void before_handle(crow::request&, crow::response& res, context&) {
        res.add_header("Access-Control-Allow-Origin", "*");
        res.add_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
        res.add_header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    }
    
    void after_handle(crow::request&, crow::response&, context&) {}
};