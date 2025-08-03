"use client";

import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function GeneratingScreen() {
  const [progress, setProgress] = useState(80);

  useEffect(() => {
    // Simulate loading progress
    const timer = setTimeout(() => {
      if (progress < 100) {
        setProgress((prev) => Math.min(prev + 5, 100));
      } else {
        // Navigate to home after completion
        router.replace("/home");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backIcon}>←</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        {/* 3D Abstract Shape */}
        <View style={styles.shapeContainer}>
          <View style={styles.abstractShape}>
            {/* Simulating a 3D mesh with gradient circles */}
            <View style={[styles.meshCircle, { top: 20, left: 30 }]} />
            <View style={[styles.meshCircle, { top: 60, left: 80 }]} />
            <View style={[styles.meshCircle, { top: 100, left: 40 }]} />
            <View style={[styles.meshCircle, { top: 140, left: 90 }]} />
            <View style={[styles.meshCircle, { top: 180, left: 20 }]} />
            <View style={[styles.meshCircle, { top: 220, left: 70 }]} />
          </View>
        </View>

        <Text style={styles.locationText}>Bali, Indonesia</Text>
        <Text style={styles.statusText}>Generating...</Text>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <View style={styles.progressLabels}>
            <Text style={styles.progressLabel}>{progress}%</Text>
            <Text style={styles.progressLabel}>100%</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#2a2a2a",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  backIcon: {
    color: "#fff",
    fontSize: 18,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  shapeContainer: {
    width: 300,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 60,
  },
  abstractShape: {
    width: 250,
    height: 250,
    position: "relative",
  },
  meshCircle: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FF6B35",
    opacity: 0.8,
    shadowColor: "#FF6B35",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
  },
  locationText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  statusText: {
    fontSize: 16,
    color: "#999",
    marginBottom: 60,
  },
  progressContainer: {
    width: "100%",
    maxWidth: 300,
  },
  progressBar: {
    height: 6,
    backgroundColor: "#333",
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#FF6B35",
    borderRadius: 3,
  },
  progressLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressLabel: {
    fontSize: 14,
    color: "#999",
  },
});
