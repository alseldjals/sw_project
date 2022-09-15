import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Mousewheel } from "swiper";

const Wrapper = styled.div`
  background-color: black;
`;
const Main = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Home = () => {
  return (
    <Wrapper>
      <Swiper
        speed={1200}
        slidesPerView={1}
        direction={"vertical"}
        mousewheel={{ invert: false }}
        modules={[Mousewheel]}
        className="mySwiper"
        style={{
          height: "84vh",

          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SwiperSlide>
          <Main>
            <img
              style={{
                display: "flex",
                alignItems: "center",
                width: "81%",
              }}
              src="mainmotion.gif"
              alt=""
            />
          </Main>
        </SwiperSlide>
        <SwiperSlide>
          <Main>
            <video style={{ width: "80%" }} src="sample.mp4" controls loop />
          </Main>
        </SwiperSlide>
        <SwiperSlide>
          <Main>
            <video style={{ width: "80%" }} src="sample.mp4" controls loop />
          </Main>
        </SwiperSlide>
      </Swiper>
    </Wrapper>
  );
};
export default Home;
