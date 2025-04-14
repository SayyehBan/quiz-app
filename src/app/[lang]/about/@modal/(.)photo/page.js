import Frame from "@/src/components/modal/Frame";
import Modal from "@/src/components/modal/Modal";

export default function PhotoModal() {
    const photo =
        "https://ghorbany.dev/wp-content/uploads/2024/06/For-Site2.jpg";

    return (
        <Modal>
            <Frame photo={photo} />
        </Modal>
    );
}
