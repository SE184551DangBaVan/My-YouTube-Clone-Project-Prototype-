export const formatViews = (views: number): string => {
    if (views >= 1_000_000) {
      return (views / 1_000_000).toFixed(1) + 'M';
    } else if (views >= 1000) {
      return (views / 1000).toFixed(1) + 'K';
    } else if (views >= 10000) {
        return (views / 10000).toFixed(2) + 'K';
    }
    return views.toString();
  };
  