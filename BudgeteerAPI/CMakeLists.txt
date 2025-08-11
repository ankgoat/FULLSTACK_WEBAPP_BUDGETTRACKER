cmake_minimum_required(VERSION 3.20)
project(BudgetTrackerBackend CXX)

# ---- C++ standard ----
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# ---- Silence FindBoost policy warning from vcpkg wrapper ----
# (Must be set before any Boost find_package)
if(POLICY CMP0167)
  cmake_policy(SET CMP0167 NEW)
endif()

message(STATUS "Using vcpkg toolchain file: ${CMAKE_TOOLCHAIN_FILE}")

# ---- Sources ----
set(SOURCES
  main.cpp
  api/ExpectedRoutes.cpp
  api/TransactionRoutes.cpp
  models/ExpectedExpense.cpp
  models/Transaction.cpp
  models/UpcomingItem.cpp
)

add_executable(${PROJECT_NAME} ${SOURCES})

# ---- Your headers ----
target_include_directories(${PROJECT_NAME} PRIVATE
  ${CMAKE_CURRENT_SOURCE_DIR}/include
  ${CMAKE_CURRENT_SOURCE_DIR}/api
  ${CMAKE_CURRENT_SOURCE_DIR}/models
  ${CMAKE_CURRENT_SOURCE_DIR}/db
)

# Target Windows 10 (removes _WIN32_WINNT noise from Crow/Asio)
target_compile_definitions(${PROJECT_NAME} PRIVATE _WIN32_WINNT=0x0A00)

# ---- Dependencies (vcpkg) ----
find_package(Crow CONFIG REQUIRED)
find_package(nlohmann_json CONFIG REQUIRED)
find_package(Boost REQUIRED COMPONENTS filesystem)

# SQLite: try config first, then unofficial, then module
find_package(SQLite3 CONFIG QUIET)
if(SQLite3_FOUND)
  set(_sqlite_target SQLite::SQLite3)
else()
  find_package(unofficial-sqlite3 CONFIG QUIET)
  if(TARGET unofficial::sqlite3)
    set(_sqlite_target unofficial::sqlite3)
  else()
    find_package(SQLite3 REQUIRED) # module fallback
    set(_sqlite_target SQLite::SQLite3)
  endif()
endif()

# ---- Link ----
target_link_libraries(${PROJECT_NAME} PRIVATE
  Crow::Crow
  nlohmann_json::nlohmann_json
  Boost::filesystem
  ${_sqlite_target}
)

# ---- Summary ----
message(STATUS "==== Build Configuration Summary ====")
message(STATUS "C++ Standard: ${CMAKE_CXX_STANDARD}")
message(STATUS "Target Triplet: ${VCPKG_TARGET_TRIPLET}")
message(STATUS "Build Type: ${CMAKE_BUILD_TYPE}")
