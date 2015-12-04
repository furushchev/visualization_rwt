#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Author: Yuki Furuta <furushchev@jsk.imi.i.u-tokyo.ac.jp>

import numpy as np
import cv2

import rospy
from std_msgs.msg import Float32, String
from sensor_msgs.msg import CompressedImage

def callback(msg):
    rospy.loginfo("received: %f" % msg.data)
    label_pub.publish(String(str(msg.data)))
    publish_image(int(msg.data))

def publish_image(val):
    img = np.zeros((300,300,3), np.uint8)
    font = cv2.FONT_HERSHEY_SIMPLEX
    cv2.putText(img, str(val), (0, 120), font, 4, (255, 0, val), 4)
    msg = CompressedImage()
    msg.header.stamp = rospy.Time.now()
    msg.format = 'jpeg'
    msg.data = np.array(cv2.imencode('.jpg', img)[1]).tostring()
    img_pub.publish(msg)

if __name__ == '__main__':
    rospy.init_node("rwt_gui_sample")
    label_pub = rospy.Publisher("sample_label", String)
    img_pub = rospy.Publisher("sample_img_compressed", CompressedImage)
    slider_sub = rospy.Subscriber("sample_slider", Float32, callback)
    rospy.spin()
