import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {Metrix, Fonts, Colors, Images} from '../../config';

export const Header = ({
  text,
  username,
  rightPress,
  leftPress,
  rightItem,
  leftItem,
  showBorder = true,
  fromNotification = false,
  unSeenNotification,
  leftWidth = Metrix.VerticalSize(40),
  leftHeight = Metrix.VerticalSize(40),
}) => (
  <View
    style={[
      {
        width: Metrix.HorizontalSize(375),
        alignItems: 'center',
        flexDirection: 'row',
        height: Metrix.VerticalSize(116),
        // backgroundColor: Colors.Primary,
        paddingHorizontal: Metrix.HorizontalSize(10),
        borderBottomColor: Colors.DarkBlue,
      },
      !showBorder ? {} : {borderBottomWidth: Metrix.VerticalSize(1)},
    ]}>
    {
      <View
        style={{
          width: Metrix.HorizontalSize(70),
          flexDirection: 'row',
          justifyContent: 'center',
          marginLeft: Metrix.HorizontalSize(10),
        }}>
        <TouchableOpacity
          onPress={leftPress}
          style={{
            width: Metrix.VerticalSize(50),
            height: Metrix.VerticalSize(50),
            borderRadius: Metrix.VerticalSize(100),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            resizeMode={'cover'}
            style={{
              width: leftWidth,
              height: leftHeight,
              backgroundColor: Colors.White,
              borderRadius: 50,
              alignSelf: 'center',
            }}
            source={leftItem}
          />
        </TouchableOpacity>
        <Text
          style={{
            textAlign: 'center',
            alignSelf: 'center',
          }}>
          {username}
        </Text>
      </View>
    }
    <View
      style={{
        width: Metrix.HorizontalSize(210),
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        style={{
          width: Metrix.HorizontalSize(65),
          height: Metrix.VerticalSize(35),
          resizeMode: 'contain',
        }}
        source={Images.firebase}
      />
    </View>
    <View
      style={{
        width: Metrix.HorizontalSize(65),
        alignItems: 'flex-end',
      }}>
      {rightItem ? (
        <>
          {fromNotification ? (
            <View>
              {unSeenNotification > 0 && (
                <View
                  style={{
                    width: Metrix.VerticalSize(15),
                    height: Metrix.VerticalSize(15),
                    borderRadius: Metrix.VerticalSize(15),
                    backgroundColor: Colors.Red,
                    position: 'absolute',
                    right: Metrix.HorizontalSize(0),
                    top: Metrix.VerticalSize(-2),
                    elevation: 5,
                  }}
                />
              )}
              <TouchableOpacity onPress={rightPress}>
                <Image
                  style={{
                    width: Metrix.VerticalSize(32),
                    height: Metrix.VerticalSize(32),
                  }}
                  source={rightItem}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={{marginRight: Metrix.HorizontalSize(10)}}
              onPress={rightPress}>
              <Image
                style={{
                  width: Metrix.VerticalSize(32),
                  height: Metrix.VerticalSize(32),
                }}
                source={rightItem}
              />
            </TouchableOpacity>
          )}
        </>
      ) : (
        <View />
      )}
    </View>
  </View>
);
