import Link from "next/link";
import Layout from "../components/Layout";
import { APP_NAME } from "@/config";

const data = [
  {
    title: "Marvel Avengers",
    tag: "#science fiction",
    des: "Why is the MCU designed the way it is?",
    cont: "An exploration into the MCU.",
    image: "https://images.unsplash.com/photo-1608889175638-9322300c46e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1hcnZlbCUyMG1vdmllc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60"
  },
  {
    title: "Marvel Avengers",
    tag: "#science fiction",
    des: "Why is the MCU designed the way it is?",
    cont: "An exploration into the MCU.",
    image: "https://images.unsplash.com/photo-1640499900704-b00dd6a1103a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bWFydmVsJTIwYXZlbmdlcnN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60"
  },
  {
    title: "Marvel Avengers",
    tag: "#science fiction",
    des: "Why is the MCU designed the way it is?",
    cont: "An exploration into the MCU.",
    image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW92aWUlMjBwb3N0ZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60"
  },
]

const Index = () => {
  return (
    <Layout>
      <article className="flex flex-col items-center ">
        <div className="font-bold mt-5 textshd text-center text-[48px]">{APP_NAME}</div>
        <div className="font-bold sub-head text-center text-[18px]">Welcome to {APP_NAME}</div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  
          {data.map(card => (
            <div className="card w-full">
              <div className="card-header">
                <img
                  src={card.image} alt="rover"
                />
              </div>
              <div className="card-body">
                <span className="tag tag-teal">{card.title}</span>
                <span style={{ color: "black" }} class="tag t-one">
                  {card.tag}
                </span>
                <Link href="/blogs">
                  <h4 className="card-link mt-4">
                    {card.des}
                  </h4>
                </Link>
                <p>{card.cont}</p>
              </div>
            </div>
          ))}
        </div>
      </article>
    </Layout>
  );
};

export default Index;
{/* <div className="row ">
  <div className="col-md-4">
    <div className="c">
      <div className="card-header">
        <img
          src="https://images.unsplash.com/photo-1640499900704-b00dd6a1103a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bWFydmVsJTIwYXZlbmdlcnN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60"
          alt="rover"
        />
      </div>
      <div className="card-body">
        <span className="tag tag-teal">Marvel Avengers</span>
        <span style={{ color: "black" }} class="tag t-one">
          #science fiction
        </span>
        <Link href="/blogs">
          <h4 className="card-link mt-4">
            Why is the MCU designed the way it is?
          </h4>
        </Link>

        <p>An exploration into the MCU.</p>
      </div>
    </div>
  </div>

  <div className="col-md-4">
    <div className="c">
      <div className="card-header">
        <img src="https://images.unsplash.com/photo-1608889175638-9322300c46e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1hcnZlbCUyMG1vdmllc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60" alt="rover" />
      </div>
      <div className="card-body">
        <span className="tag tag-teal">Marvel</span>
        <span style={{ color: "black" }} class="tag t-one">
          #moon_knight
        </span>
        <Link href="/blogs">
          <h4 className="card-link mt-4">
            Moon Knight Is Unlike Any Other Superhero
          </h4>
        </Link>
        <p>
          Going into Moon Knight, I had few expectations. I wasn’t
          familiar with the character.
        </p>
      </div>
    </div>
  </div>

  <div className="col-md-4">
    <div className="c">
      <div className="card-header">
        <img
          src="https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW92aWUlMjBwb3N0ZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60"
          alt="rover"
        />
      </div>
      <div className="card-body">


        <span className="tag tag-teal">Netflix</span>
        <span style={{ color: "black" }} class="tag t-one">
          #spiderman
        </span>
        <Link href="/blogs">
          <h4 className="card-link mt-4">
            We Need to Talk About the Spider Man
          </h4>
        </Link>
        <p>
          Spiderman 2099 horrifying origin story..
        </p>
      </div>
    </div>
  </div>
</div> */}