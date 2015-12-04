cmake_minimum_required(VERSION 2.8.3)
project(rwt_gui)

find_package(catkin REQUIRED COMPONENTS)

catkin_package(
  CATKIN_DEPENDS roslibjs rwt_utils_3rdparty
)

install(DIRECTORY www launch
  DESTINATION ${CATKIN_PACKAGE_SHARE_DESTINATION}
)