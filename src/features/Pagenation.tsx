"use client"

interface PAGINATION {
    paginations : number[]
}

export const Pageination = ({ paginations } : PAGINATION) => {

    console.log(paginations)

    return (
        <article className="w-full">
            <h2 className="sr-only">페이지네이션</h2>
            <ol className="flex justify-center items-center gap-[15px] text-basic-color">
                <li><button>1</button></li>
                <li><button>2</button></li>
                <li><button>3</button></li>
                <li><button>4</button></li>
                <li><button>5</button></li>
                <li><button>6</button></li>
                <li><button>7</button></li>
                <li><button>8</button></li>
                <li><button>9</button></li>
                <li><button>10</button></li>
            </ol>
        </article>
    )
}