class ArrayCopyDemo {
  public static void main(String[] args) {
    String[] copyFrom = {
      "Affogato", "Americano", "Cappuccino"
    };

    // String[] copyTo = new String[7];
    // System.arraycopy(copyFrom, 1, copyTo, 0, 2);

    String[] copyTo = java.util.Arrays.copyOfRange(copyFrom, 1, 3);

    // for (String coffee : copyTo) {
    //   System.out.print(coffee + " ");
    // }

    java.util.Arrays.stream(copyTo).map(coffee -> coffee + " ").forEach(System.out::print);
  }
}