import AppBarTop from "../../components/Bars/AppBarTop";
import Box from "@mui/material/Box";
import { useContext } from "react";
import { WhoIsCtx } from "../../store/WhoIsCtx";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Autocomplete from "@mui/joy/Autocomplete";
import { useState, useRef } from "react";
import { AddDataToDb } from "../../functions/dataTransition/AddDataToDb";
import { UserCredentials } from "../../interfaces/userCredentials";
import { redirect } from "react-router-dom";
import { fillKshirutPerMakat } from "../../functions/dataManipulation/fillKshirutPerMakat";
import { getIsManeger } from "../../functions/Authentication/getIsManeger";
import { checkAuth } from "../../functions/Authentication/checkAuth";
import { DataForUser } from "../../interfaces/DataForUser";
import { DataPerMakat } from "../../interfaces/DataPerMakat";
import ThemeObj from "../../interfaces/ThemeObj";
import setTheme from "../../functions/style/setTheme";
import { ThemeContext } from "../../store/ThemeModeCtx";
import getGdudArray from "../../functions/dataManipulation/getGdudArray";
import useToast from "../../hooks/useToast";
import Toast from "../../components/popups/Toast";
import getMakatArray from "../../functions/dataManipulation/getMakatArray";
const Kshirut = [{ option: "כשיר" }, { option: "לא כשיר" }];
let DataForUserArr: DataForUser[] = [];
let whoIs: string;
let gdudArr: { option: string }[] = [{ option: "" }];
let MakatArr: { option: string }[] = [{ option: "" }];
let KshirotPerMakat: DataPerMakat[] = [];
let userProfile: UserCredentials | any;

const AddPage: React.FC = () => {
  const { isOpen, showToast, text, textType, setIsOpen } = useToast();
  const { mode, setMode } = useContext(ThemeContext);
  const [kshirot, setKshirot] = useState<string | null>(Kshirut[0].option);
  const [gdud, setGdud] = useState<string | null>(null);
  const chosenCarNumber = useRef<HTMLInputElement>(null);
  const [makat, setMakat] = useState<string | null>(null);
  let Theme: ThemeObj;
  let FormClassTheme;
  async function handleSubmmiton(event: React.FormEvent) {
    //טיפול של הסופת המידע למאגד המידע
    event.preventDefault();
    if (chosenCarNumber.current?.value !== undefined && makat !== null) {
      if (
        /^\d+$/.test(chosenCarNumber.current.value) &&
        chosenCarNumber.current.value.length === 6 &&
        /^\d+$/.test(makat) &&
        makat.length === 6 &&
        typeof gdud == "string" &&
        /^\d+$/.test(gdud) &&
        (kshirot === "כשיר" || kshirot === "לא כשיר")
      ) {
        userProfile = localStorage.getItem("userProfile");
        userProfile = JSON.parse(userProfile);
        try{
          const res = await AddDataToDb({
            gdud: gdud,
            carNumber: chosenCarNumber.current?.value,
            kshirot: kshirot,
            makat: makat,
            token: userProfile.token,
            pernr: userProfile.pernr,
          });
          if (!res) {
            showToast(
              "Your request was denied by the server , please contact the administrator or try again",
              "error"
            );
          } else {
            showToast("Data was successfuly inserted", "success");
          }
        } catch(error){
          showToast("an error occurred 400, please refresh the website and try again", "error");
        }
        
      } else {
        showToast(
          "Input Error : one of Your form inputs are invalid please try again with valid data",
          "warning"
        );
      }
    } else {
      showToast("Input Error : data cannot be undefined", "error");
    }
  }
  const WhoIsContext = useContext(WhoIsCtx);
  WhoIsContext.WhoIs = whoIs;
  if (mode === "light") {
    //קטע קוד לבירור התאורה
    Theme = setTheme("light");
    FormClassTheme = "AddFormLight";
  } else {
    Theme = setTheme("dark");
    FormClassTheme = "AddFormDark";
  }
  gdudArr = getGdudArray(DataForUserArr);
  MakatArr = getMakatArray(KshirotPerMakat);
  return (
    <Box sx={{ backgroundColor: Theme.backGroundColor, height: "100vh" }}>
      <AppBarTop whoIs={WhoIsContext.WhoIs} />
      <Box
        flexDirection="row-reverse"
        display="flex"
        justifyContent="center"
        height="90vh"
        width="100vw"
        margin="0"
        alignItems="center"
      >
        <Toast
          message={text}
          type={textType}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
        <form className={FormClassTheme}>
          <p
            style={{
              fontWeight: "700",
              marginTop: "50px",
              color: Theme.fontColor,
            }}
          >
            {" "}
            הוספת צ
          </p>
          <Input
            inputRef={chosenCarNumber}
            sx={{ width: "80%", color: Theme.fontColor }}
            type="text"
            name="carNumber"
            placeholder="צ הכלי"
            required
          />

          <Autocomplete
            placeholder='מק"ט'
            onChange={(event, newValue) => {
              setMakat(newValue);
            }}
            className={"AddFormAutocomplete"}
            sx={{ backgroundColor: "transparent", color: Theme.fontColor }}
            id="SelectKshirot"
            options={MakatArr.map((option) => option.option)}
            required
          />
          <Autocomplete
            placeholder="כשירות"
            onChange={(event, newValue) => {
              setKshirot(newValue);
            }}
            className={"AddFormAutocomplete"}
            sx={{ backgroundColor: "transparent", color: Theme.fontColor }}
            id="SelectKshirot"
            options={Kshirut.map((option) => option.option)}
            required
          />
          <Autocomplete
            placeholder="גדודים"
            onChange={(event, newValue) => {
              setGdud(newValue);
            }}
            className={"AddFormAutocomplete"}
            sx={{ backgroundColor: "transparent", color: Theme.fontColor }}
            id="SelectKshirot"
            options={gdudArr.map((option) => option.option)}
            required
          />
          <Button
            sx={{
              width: "30%",
              marginBottom: "50px",
              color: "#87A922",
              borderColor: "#87A922",
            }}
            type="submit"
            onClick={handleSubmmiton}
            variant="outlined"
            aria-label="fingerprint"
          >
            + הוסף
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export async function loader() {
  if (await checkAuth()) {
    userProfile = localStorage.getItem("userProfile");
    if (typeof userProfile === "string") {
      userProfile = JSON.parse(userProfile);
      const response = await fetch("http://localhost:3001/GetDataForUser", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3001",
        },
        body: JSON.stringify(userProfile),
        mode: "cors",
      });
      if (!response.ok) {
        alert("somthing goes wrong with data fetching");
      } else {
        DataForUserArr = await response.json();
        KshirotPerMakat = fillKshirutPerMakat(DataForUserArr);
      }
    } else {
      console.log("User credentials was Expired or Wrong type");
      redirect("/");
    }
    if ((await getIsManeger()) === true) {
      whoIs = "מנהל מערכת";
    } else {
      return redirect(`/DashBoardPage/${userProfile.pernr}`);
    }
  } else {
    return redirect("/");
  }
  return null;
}

export default AddPage;
