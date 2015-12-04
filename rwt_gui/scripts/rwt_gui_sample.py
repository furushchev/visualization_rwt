#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Author: Yuki Furuta <furushchev@jsk.imi.i.u-tokyo.ac.jp>


import rospy
from std_msgs.msg import Float32, String

def callback(msg):
    rospy.loginfo("received: %f" % msg.data)
    pub.publish(String(str(msg.data)))

if __name__ == '__main__':
    rospy.init_node("rwt_gui_sample")
    pub = rospy.Publisher("sample_label", String)
    sub = rospy.Subscriber("sample_slider", Float32, callback)
    rospy.spin()
