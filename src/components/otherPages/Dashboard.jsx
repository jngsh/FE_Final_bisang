import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from "@/utils/globalBaseUrl";

export default function Dashboard() {
  const [petName, setPetName] = useState('');
  const [petBirthdate, setPetBirthdate] = useState('');
  const [petType, setPetType] = useState('D');
  const [petImage, setPetImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // 이미지 미리보기 상태
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [isPetRegistered, setIsPetRegistered] = useState(false);
  const [registeredPet, setRegisteredPet] = useState(null);

  useEffect(() => {
    const fetchPetData = async () => {
      if (userId) {
        try {
          const response = await axios.get(`${BASE_URL}/bisang/pets/user/${userId}`);
          if (response.status === 200) {
            if (response.data.length > 0) {
              const petData = response.data[0];
              setRegisteredPet(petData);
              setPetName(petData.petName || '');
              setPetBirthdate(petData.petBirthdate || '');
              setPetType(petData.petType || 'D');
              setImagePreview(petData.petImage ? `${BASE_URL}/bisang/pets/images?petImage=${petData.petImage}` : null); // 이미지 URL 미리보기
              setIsPetRegistered(true);
            } else {
              setRegisteredPet(null);
              setPetName('');
              setPetBirthdate('');
              setPetType('D');
              setImagePreview(null);
              setIsPetRegistered(false);
            }
          } else {
            setRegisteredPet(null);
            setPetName('');
            setPetBirthdate('');
            setPetType('D');
            setImagePreview(null);
            setIsPetRegistered(false);
          }
        } catch (error) {
          setRegisteredPet(null);
          setPetName('');
          setPetBirthdate('');
          setPetType('D');
          setImagePreview(null);
          setIsPetRegistered(false);
        }
      }
    };

    fetchPetData();
  }, [userId]);

  useEffect(() => {
    if (registeredPet && registeredPet.petImage) {
      setImagePreview(`${BASE_URL}/bisang/pets/images?petImage=${registeredPet.petImage}`);
    }
  }, [registeredPet]);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('petName', petName);
    formData.append('petBirthdate', petBirthdate);
    formData.append('petType', petType);
  
    if (petImage) {
      formData.append('image', petImage);
    }
  
    try {
      const response = await axios.post(`${BASE_URL}/bisang/pets`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log("Status Code:", response.status); // 상태 코드 로그
      console.log("Response Headers:", response.headers); // 응답 헤더 로그
      console.log("Server Response:", response.data); // 서버 응답 데이터 로그
  
      if (response.status === 201) {
        alert("반려동물 정보가 저장되었습니다");
  
        // 서버에서 반환된 이미지 URL을 사용해 상태 업데이트
        const updatedPetData = {
          petName,
          petBirthdate,
          petType,
          petImage: response.data.petImage // 서버에서 반환된 URL
        };

        console.log("updatedPetData", updatedPetData)
  
        setPetName('');
        setPetBirthdate('');
        setPetType('D');
        setPetImage(null);
  
        // 서버에서 반환된 이미지 URL을 통해 이미지 미리보기 상태를 업데이트
        const updatedImagePreview = response.data.petImage ? `${BASE_URL}/bisang/pets/images?petImage=${response.data.petImage}&timestamp=${new Date().getTime()}` : null;
        console.log("Updated Image Preview URL:", updatedImagePreview); // 디버깅 로그
        setImagePreview(updatedImagePreview);
        setIsPetRegistered(true);
        setRegisteredPet(updatedPetData);
      } else {
        console.log('반려동물 정보 저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('서버와의 연결에 실패했습니다.', error);
    }
  };
  

  // 이미지 파일이 선택되면 미리보기 설정
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPetImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // 이미지 미리보기 URL 생성
    } else {
      setImagePreview(null);
    }
  };

  return (
    <div className="col-lg-9">
      <div className="page-content my-account__edit">
        {isPetRegistered && registeredPet ? (
          <div className="my-account__edit-form">
            <div>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="반려동물"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              )}
              <p>이름: {registeredPet.petName}</p>
              <p>생년월일: {registeredPet.petBirthdate}</p>
              <p>종류: {registeredPet.petType === 'D' ? '개' : registeredPet.petType === 'C' ? '고양이' : '기타'}</p>
            </div>
          </div>
        ) : (
          <div className="my-account__edit-form">
            <form onSubmit={handleSubmit} className="needs-validation">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-floating my-3">
                    <input
                      type="text"
                      className="form-control"
                      id="petName"
                      value={petName}
                      onChange={(e) => setPetName(e.target.value)}
                      required
                    />
                    <label htmlFor="petName">반려동물 이름</label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-floating my-3">
                    <input
                      type="date"
                      className="form-control"
                      id="petBirthdate"
                      value={petBirthdate}
                      onChange={(e) => setPetBirthdate(e.target.value)}
                      required
                    />
                    <label htmlFor="petBirthdate">생년월일</label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-floating my-3">
                    <select
                      className="form-control"
                      id="petType"
                      value={petType}
                      onChange={(e) => setPetType(e.target.value)}
                      required
                    >
                      <option value="D">개</option>
                      <option value="C">고양이</option>
                      <option value="Z">기타</option>
                    </select>
                    <label htmlFor="petType">반려동물 종류</label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-floating my-3">
                    <input
                      type="file"
                      className="form-control"
                      id="petImage"
                      accept="image/*"
                      onChange={handleImageChange} // 이미지 변경 핸들러 연결
                    />
                    <label htmlFor="petImage">반려동물 이미지 업로드</label>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="my-3">
                    <button className="btn btn-primary">
                      등록하기
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
