import XDate from 'xdate';
import React, {useCallback, useMemo} from 'react';
import {View, Text, TextStyle, TouchableOpacity, ViewStyle} from 'react-native';

export interface Event {
  id?: string;
  start: string;
  end: string;
  title: string;
  summary?: string;
  color?: string;
  borderColor?:string;
  textColor?:string;
}

export interface PackedEvent extends Event {
  index: number;
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface EventBlockProps {
  index: number;
  event: PackedEvent;
  onPress: (eventIndex: number) => void;
  renderEvent?: (event: PackedEvent) => JSX.Element;
  format24h?: boolean;
  styles: {[key: string]: ViewStyle | TextStyle};
  testID?: string;
}

const TEXT_LINE_HEIGHT = 17;
const EVENT_DEFAULT_COLOR = '#add8e6';

const EventBlock = (props: EventBlockProps) => {
  const {index, event, renderEvent, onPress, format24h, styles} = props;

  // Fixing the number of lines for the event title makes this calculation easier.
  // However it would make sense to overflow the title to a new line if needed
  const numberOfLines = Math.floor(event.height / TEXT_LINE_HEIGHT);
  const formatTime = format24h ? 'HH:mm' : 'hh:mm A';
  const eventStyle = useMemo(() => {
    return {
      left: event.left,
      height: event.height,
      width: event.width,
      top: event.top,
      backgroundColor: event.color ? event.color : EVENT_DEFAULT_COLOR
    };
  }, [event]);
  const eventTextStyle = useMemo(() => {
        return {
           color:event.textColor? event.textColor : '#000000'
        };
    }, [event]);
  const _onPress = useCallback(() => {
    onPress(index);
  }, [index, onPress]);

  return (
    <TouchableOpacity testID={props.testID} activeOpacity={0.9} onPress={_onPress} style={[styles.event, eventStyle]}>
      {renderEvent ? (
        renderEvent(event)
      ) : (
        <View>
          <Text style={[styles.eventTitle, eventTextStyle]}>
            {event.title || 'Event'}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default EventBlock;
