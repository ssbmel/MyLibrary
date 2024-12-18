import React, { useState } from "react";
import Sample from "../assets/default.png";


interface EditProfileProps {
  currentImage: string; // 현재 프로필 이미지 URL
  currentNickname: string; // 현재 닉네임
  handleEditModal: () => void;
}

const EditProfile: React.FC<EditProfileProps> = ({
  currentImage,
  currentNickname,
  handleEditModal
}) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(currentImage);
  const [nickname, setNickname] = useState<string>(currentNickname);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); // 이미지 미리보기
    }
  };

  const handleSave = () => {
  };

  const handleCloseModal = () => {
    handleEditModal();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-[350px]">
        <h2 className="text-lg font-semibold mb-4">프로필 수정</h2>

        {/* 이미지 업로드 섹션 */}
        <div className="flex flex-col items-center mb-4">
          <img
            src={currentImage ? imagePreview : Sample}
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

        {/* 닉네임 입력 섹션 */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">닉네임</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="닉네임 입력"
          />
        </div>

        {/* 버튼 섹션 */}
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
            className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
