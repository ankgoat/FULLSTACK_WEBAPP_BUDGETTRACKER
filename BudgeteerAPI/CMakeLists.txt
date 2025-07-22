cmake_minimum_required(VERSION 3.16)
project(BudgeteerAPI LANGUAGES CXX)

# Require C++20
set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Collect all source files
file(GLOB_RECURSE SRCS
    ${CMAKE_SOURCE_DIR}/vcpkg/installed/arm64-windows/include
    "${PROJECT_SOURCE_DIR}/models/*.cpp"
    "${PROJECT_SOURCE_DIR}/db/*.cpp"
    "${PROJECT_SOURCE_DIR}/features/*.cpp"
    "${PROJECT_SOURCE_DIR}/api/*.cpp"
    "${PROJECT_SOURCE_DIR}/main.cpp"
    
)

# Define the executable
add_executable(${PROJECT_NAME} ${SRCS})
add_definitions(-D_WIN32_WINNT=0x0601)


# Find and link vcpkg-installed packages
find_package(Crow CONFIG REQUIRED)             # Uppercase 'Crow'
find_package(nlohmann_json CONFIG REQUIRED)    # JSON library
find_package(unofficial-sqlite3 CONFIG REQUIRED)  # SQLite3

target_link_libraries(${PROJECT_NAME}
    PRIVATE
      Crow::Crow
      nlohmann_json::nlohmann_json
      unofficial::sqlite3::sqlite3
)
