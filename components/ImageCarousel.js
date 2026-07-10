import React, { useRef, useEffect, useState } from "react";
import { View, Image, FlatList, StyleSheet, Dimensions } from "react-native";
import { COLORS, RADIUS } from "../theme";

const { width } = Dimensions.get("window");
const CAROUSEL_WIDTH = width - 24;
const CAROUSEL_HEIGHT = 160;

export default function ImageCarousel({ images = [], autoPlay = true, interval = 3000 }) {
  const flatListRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay || images.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        const nextIndex = (prev + 1) % images.length;
        flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
        return nextIndex;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, autoPlay, interval]);

  const onScrollEnd = (e) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / CAROUSEL_WIDTH);
    setActiveIndex(index);
  };

  if (images.length === 0) return null;

  return (
    <View style={styles.wrapper}>
      <FlatList
        ref={flatListRef}
        data={images}
        keyExtractor={(_, i) => String(i)}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
        getItemLayout={(_, index) => ({
          length: CAROUSEL_WIDTH,
          offset: CAROUSEL_WIDTH * index,
          index,
        })}
        renderItem={({ item }) => (
          <View style={styles.imageWrap}>
            <Image source={{ uri: item }} style={styles.image} />
          </View>
        )}
      />
      <View style={styles.dotsRow}>
        {images.map((_, i) => (
          <View key={i} style={[styles.dot, i === activeIndex && styles.dotActive]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  imageWrap: {
    width: CAROUSEL_WIDTH,
    borderRadius: RADIUS.card,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  image: {
    width: "100%",
    height: CAROUSEL_HEIGHT,
    backgroundColor: COLORS.surface,
  },
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.border,
    marginHorizontal: 3,
  },
  dotActive: {
    backgroundColor: COLORS.gold,
    width: 16,
  },
});
