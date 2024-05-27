import { axios } from "core";

export default {
    upload: file => {
        const formData = new FormData();
        formData.append("attachments", file);
        return axios.post("/files", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    }
};
