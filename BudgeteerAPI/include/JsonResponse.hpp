#pragma once
#include <crow.h>
#include <nlohmann/json.hpp>

inline crow::response json_ok(const nlohmann::json& j, int code = 200) {
    crow::response r(code);
    r.set_header("Content-Type", "application/json");
    r.write(j.dump());
    return r;
}
