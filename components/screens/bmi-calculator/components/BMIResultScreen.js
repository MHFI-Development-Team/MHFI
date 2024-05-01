const BMIResultScreen = ({ navigation, route }) => {
    const { bmi, age, weight, height } = route.params;
  
    const handleRetry = () => {
      navigation.popToTop();
    };
  
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.title}>Your Result</Text>
          <View style={styles.resultCircle}>
            <Text style={styles.bmiValue}>{bmi}</Text>
            <Text style={styles.bmiStatus}>{bmi < 18.5 ? "Underweight" : bmi <= 24.9 ? "Normal" : bmi <= 29.9 ? "Overweight" : "Obese"}</Text>
            <Text style={styles.viewDetails}>View details</Text>
          </View>
          <View style={styles.bodyComposition}>
            <Text style={styles.bodyCompositionTitle}>Body Composition</Text>
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Age</Text>
              <Text style={styles.infoValue}>{age}</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Height</Text>
              <Text style={styles.infoValue}>{height}</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Weight</Text>
              <Text style={styles.infoValue}>{weight} kg</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };