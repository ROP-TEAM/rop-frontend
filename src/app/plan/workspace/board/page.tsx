"use client";
import styles from "./board.module.scss";
import { OrderContainer } from "@/components/ui/OrderContainer/OrderContainer";
const Board = () => {
  return (
    <div className={styles.board}>
      <OrderContainer></OrderContainer>
      <OrderContainer></OrderContainer>
      <OrderContainer></OrderContainer>
      <OrderContainer></OrderContainer>
      <OrderContainer></OrderContainer>
    </div>
  );
};

export default Board;
