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

  // 사용자 ID로 반려동물 데이터 가져오기
  useEffect(() => {
    const fetchPetData = async () => {
      if (userId) {
        try {
          const response = await axios.get(`${BASE_URL}/bisang/pets/user/${userId}`);
          console.log("Server Response:", response.data);
  
          if (response.status === 200) {
            const petData = response.data.length > 0 ? response.data[0] : null;
            setRegisteredPet(petData);
  
            if (petData) {
              setPetName(petData.petName || '');
              setPetBirthdate(petData.petBirthdate || '');
              setPetType(petData.petType || 'D');
  
              // petImage가 객체인지 확인하고, 올바른 파일명을 추출합니다.
              if (petData.petImage && typeof petData.petImage === 'object') {
                const petImageObject = petData.petImage;
                // 파일명만 추출합니다.
                const imageFileName = petImageObject.petImage; // 파일명 추출
                // 파일명이 문자열인지 확인합니다.
                if (typeof imageFileName === 'string' && imageFileName.trim()) {
                  const imageUrl = `${BASE_URL}/bisang/pets/images?petImage=${encodeURIComponent(imageFileName)}`;
                  setImagePreview(imageUrl);
                  console.log("petImage Object: ", petImageObject);
                  console.log("imageURL: ", imageUrl);
                } else {
                  console.error('Invalid imageFileName:', imageFileName);
                  setImagePreview(null);
                }
              } else {
                setImagePreview(null);  // 이미지가 없을 경우 null로 설정
              }
  
              setIsPetRegistered(true);
            } else {
              resetForm();
            }
          } else {
            resetForm();
          }
        } catch (error) {
          console.error('데이터를 가져오는 데 실패했습니다:', error);
          resetForm();
        }
      }
    };
  
    fetchPetData();
  }, [userId]);


  // // 반려동물 데이터가 변경되면 이미지 미리보기 업데이트
  // useEffect(() => {
  //   if (registeredPet && registeredPet.petImage) {
  //     setImagePreview(`${BASE_URL}/bisang/pets/images?petImage=${registeredPet.petImage}`);
  //     console.log("registeredPet.petImage", registeredPet.petImage);
  //     console.log("registeredPet.petImage.petImage", registeredPet.petImage.petImage);
  //   }
  // }, [registeredPet]);

  // 폼 제출 핸들러
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('petName', petName);
    formData.append('petBirthdate', petBirthdate);
    formData.append('petType', petType);
  
    if (petImage) {
      formData.append('petImage', petImage);
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
      console.log("petImage", response.data.petImage);
      if (response.status === 201) {
        alert("반려동물 정보가 저장되었습니다");
  
        const updatedPetData = {
          petName,
          petBirthdate,
          petType,
          petImage: response.data.petImage // 서버에서 반환된 URL
        };

        setRegisteredPet(updatedPetData); // 서버에서 반환된 데이터를 상태에 반영

        setPetName('');
        setPetBirthdate('');
        setPetType('D');
        setPetImage(null);
  
      // 서버에서 반환된 이미지 URL을 통해 이미지 미리보기 상태를 업데이트
      const updatedImagePreview = response.data.petImage ? `${BASE_URL}/bisang/pets/images?petImage=${response.data.petImage}` : null;
        console.log("updatedImagePreview", updatedImagePreview);
        setImagePreview(updatedImagePreview);
        setIsPetRegistered(true);
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
    console.log("file", file);
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // 이미지 미리보기 URL 생성
    } else {
      setImagePreview(null);
    }
  };

  // 폼 초기화 함수
  const resetForm = () => {
    setRegisteredPet(null);
    setPetName('');
    setPetBirthdate('');
    setPetType('D');
    setImagePreview(null);
    setIsPetRegistered(false);
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
