import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import HabitCircularCard from './HabitCircularCard';
import globalStyles from '@/constants/globalStyles';

const windowHeight = Dimensions.get('window').height;

interface SubTask {
  id: string;
  name: string;
}

interface HabitCardProps {
  habitName: string;
  subTasks: SubTask[];
  imageUri: string | null;
  date: string;
  notes: string;
  onPress: () => void;
  onLongPress: () => void;
}

const HabitCard: React.FC<HabitCardProps> = ({
  habitName,
  subTasks,
  imageUri,
  date,
  notes,
  onPress,
  onLongPress,
}) => {
  const formattedDate = new Date(date).toLocaleDateString();
  const formattedTime = new Date(date).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <TouchableOpacity onLongPress={onLongPress} onPress={onPress} style={styles.card}>
      <HabitCircularCard imageUri={imageUri} size={windowHeight * 0.125} />
      <View style={styles.textContainer}>
        <Text style={[globalStyles.text, { fontWeight: '500', textAlign: 'center' }]}>
          {habitName}
        </Text>
        <Text style={[globalStyles.text, { fontWeight: '500', textAlign: 'center' }]}>
          {subTasks.length} Sub-Task{subTasks.length !== 1 ? 's' : ''}
        </Text>
        <Text style={[globalStyles.text, { fontWeight: '500', textAlign: 'center' }]}>
          {formattedDate} {formattedTime}
        </Text>
        {notes ? <Text style={styles.notes}>{notes}</Text> : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 8,
  },
  textContainer: {
    marginTop: windowHeight * 0.005,
    alignItems: 'center',
  },
  notes: {
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

export default HabitCard;
