import { colors } from "@/constants/theme";
import { Modal, StyleSheet, View } from "react-native";
import { Button } from "./Button";
import { Typo } from "./Typo";

export type ConfirmationModalProps = {
  visible: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
};

export function ConfirmationModal({
  visible,
  title,
  message,
  onConfirm,
  onClose,
  confirmText = "Deletar",
  cancelText = "Cancelar",
  loading = false,
}: ConfirmationModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Typo style={styles.title}>{title}</Typo>

          <Typo style={styles.message}>{message}</Typo>

          <View style={styles.buttonContainer}>
            <Button style={styles.cancelButton} onPress={onClose}>
              <Typo style={styles.cancelButtonText}>{cancelText}</Typo>
            </Button>

            <Button
              style={styles.confirmButton}
              onPress={onConfirm}
              disabled={loading}
            >
              <Typo style={styles.confirmButtonText}>{confirmText}</Typo>
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: colors.background.card,
    borderRadius: 20,
    padding: 20,
    width: "80%",
    gap: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.primary.orange,
  },
  message: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: colors.border.primary,
    paddingVertical: 12,
    borderRadius: 12,
  },
  cancelButtonText: {
    color: colors.text.primary,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  confirmButton: {
    flex: 1,
    backgroundColor: colors.primary.orange,
    paddingVertical: 12,
    borderRadius: 12,
  },
  confirmButtonText: {
    color: colors.text.primary,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
