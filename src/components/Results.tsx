import { Question } from "@/types/Question"

type Props = {
    questionList: Question[],
    answers: number[]
}

export const Results = ({ questionList, answers }: Props) => {
    return (
        <div>
            {questionList.map((item, key) => (
                <div key={key} className="mb-3">
                    <div className="font-bold text-xs">{key + 1}. {item.question}</div>
                    <div>
                        <span>({item.answer === answers[key] ? 'Acertouu' : 'Errouuu!'}) - </span>
                        {item.options[item.answer]}
                    </div>
                </div>
            ))}
        </div>
    )
}

