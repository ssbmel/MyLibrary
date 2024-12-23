import React, { useState } from "react";
import Sample from "../assets/default.png";
import supabase from "../supabase/supabaseClient";
import { useUserStore } from "../store/userStore";


interface EditProfileProps {
  currentImage: string; 
  currentNickname: string;
  handleEditModal: () => void;
}

const EditProfile: React.FC<EditProfileProps> = ({
  currentImage,
  currentNickname,
  handleEditModal
}) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(currentImage);
  const [newNickname, setNewNickname] = useState<string>(currentNickname);
  const user = useUserStore((state)=>state.user);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (file: File) => {
    const { data, error } = await supabase.storage
      .from("profile_images")
      .upload(`profiles/${user?.id}/${file.name}`, file);
  
    if (error) {
      console.error("이미지 업로드 실패:", error.message);
      return null;
    }
  
    // 업로드된 이미지 URL 반환
    const { data: publicURL } = supabase.storage
      .from("profile_images")
      .getPublicUrl(`profiles/${user?.id}/${file.name}`);
    return publicURL.publicUrl;
  };

  const handleSave = async () => {
    let imageUrl = imagePreview;
  
    if (imageFile) {
      const uploadedImageUrl = await uploadImage(imageFile);
      if (uploadedImageUrl) {
        imageUrl = uploadedImageUrl;
      }
    }

    if(!user) return;
  
    const { data, error } = await supabase
      .from("users")
      .update({
        id: user.id,
        nickname: newNickname,
        email: user.email,
        profile_img: imageUrl,
      })
      .eq("id", user.id);
  
    if (error) {
      console.error("프로필 업데이트 실패:", error.message);
    } else {
      alert("프로필이 성공적으로 업데이트되었습니다!");
      console.log(data);
      
      handleEditModal();
    }
  };
  

  const handleCloseModal = () => {
    handleEditModal();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-[350px]">
        <h2 className="text-lg font-semibold mb-4">프로필 수정</h2>

        <div className="flex flex-col items-center mb-4">
          <img
            src={imagePreview || Sample}
            alt="프로필 이미지"
            className="w-[100px] h-[100px] rounded-full object-cover mb-2 border"
          />
          <label
            htmlFor="profileImage"
            className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-sm px-4 py-1 rounded"
          >
            이미지 변경
          </label>
          <input
            id="profileImage"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">닉네임</label>
          <input
            type="text"
            value={newNickname}
            onChange={(e) => setNewNickname(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="닉네임 입력"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={handleCloseModal}
            className="px-4 py-2 bg-gray-200 text-sm rounded hover:bg-gray-300"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-red-900 hover:bg-red-500 text-white text-sm rounded"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
