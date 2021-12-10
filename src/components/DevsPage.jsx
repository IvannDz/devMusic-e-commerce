import React from "react";
import DevCard from "./DevCard";
import { Flex, WrapItem, Wrap } from "@chakra-ui/react";

const DevsPage = () => {
  const dataOva = {
    title: "EL TITAN",
    photo:
      "https://cdn.discordapp.com/attachments/897571153550389278/910976210685816912/0s.jpg",
    name: "Osvaldo Ojeda",
    description:
      "Full Stack maker & UI / UX Designer , le gusta decir pipu y titan, amante de la chocolatada 💕es amante de php y laravel💕",
    job: "Vicepresidente Jr",
    country: "Buenos Aires, Argentina",
    email: "osvaldoojedadeveloper@gmail.com",
  };

  const dataMaxi = {
    title: "El conductista",
    photo:
      "https://cdn.discordapp.com/attachments/888449049852805190/910979862620168192/yo.jpg",
    name: "Maxi Linari",
    description:
      "Full Stack maker & UI / UX Designer , le gusta decir palabras raras y le duele la espalda, sueña con ser coach de p5",
    job: " Senior UX Consultant y coach",
    country: "Buenos Aires, Argentina",
    email: "mjlinari@gmail.com",
  };

  const dataIvo = {
    title: "Mr insomnia",
    photo:
      "https://cdn.discordapp.com/attachments/906277443361472608/910990051381493860/Screenshot_20211118-172736.png",
    name: "Iván Dominguez",
    description: "Full Stack maker & UI / UX Designer , no tiene mas fotos, da mala suerte en el lol pero parece ser un agradable sujeto",
    job: "CEO devMusic",
    country: "Cerca de todo",
    email: "ivanleodomin00@gmail.com",
  };
  const dataTomi = {
    title: "Don Matcha",
    photo:
      "https://cdn.discordapp.com/attachments/887366490213474314/910985767340376155/Yo_Foto_perfecta_para_Linkedin.jpeg",
    name: "Tomi Gil Amoedo",
    description:
      "Full Stack maker & UI / UX Designer, le gusta el matcha, tiene una foto perfecta para Linkedin y queria usar Material UI",
    job: "Leader UX Design Sector",
    country: "Buenos Aires, Argentina",
    email: "tomasgilamoedo@gmail.com",
  };
  const dataMaru = {
    title: "La silenciosa",
    photo:
      "https://cdn.discordapp.com/attachments/888120738597462086/910985965705789510/IMG_20211107_013800824_1.jpg",
    name: "Maru Guerrero",
    description:
      "Full Stack maker & UI / UX Designer , se mutea mucho y no le gusta el diseño. Estudio medicina pero con la programacion se lucra mas",
    job: "Developer facherita",
    country: "Desconocido",
    email: "maruguerrero7@gmail.com",
  };

  const dataMati = {
    title: "Don Chakra",
    name:"Mati Di Fiore",
    photo:
      "https://cdn.discordapp.com/attachments/888120738597462086/910993017077391360/Screenshot_20211118-174011.png",
    description:
      "Full Stack maker & UI / UX Designer , lloro la primer semana por Chakra pero ahora es un senior casi semi, tiene una foto con un canguro",
    job: "President devMusic",
    country: "Buenos Aires, Argentina",
    email: "difioremati@gmail.com",
  };

  return (
    <Flex direction="column">
      <Flex direction="row">
        <Wrap spacing="10px" justify="center" mr="10px">
          <WrapItem>
            <DevCard data={dataOva} />
          </WrapItem>
          <WrapItem>
            <DevCard data={dataMaru} />
          </WrapItem>
          <WrapItem>
            <DevCard data={dataIvo} />
          </WrapItem>
          <WrapItem>
            <DevCard data={dataMaxi} />
          </WrapItem>
          <WrapItem>
            <DevCard data={dataMati} />
          </WrapItem>
          <WrapItem>
            <DevCard data={dataTomi} />
          </WrapItem>
        </Wrap>
      </Flex>
    </Flex>
  );
};

export default DevsPage;