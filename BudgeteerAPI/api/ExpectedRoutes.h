#pragma once
#include <crow.h>
#include "../db/ExpectedExpenseRepo.h"

class ExpectedRoutes {
public:
    static void registerRoutes(crow::App<>& app, ExpectedExpenseRepo& repo);
};
