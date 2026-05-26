import z from "zod"

export const mettingFormModel = z.object({
    postStatus : z.enum(["add", "update"]),
    mettingTitle : z.string().min(1, "모임 명을 입력해주세요.").min(2, "최소 2자 이상 입력해주세요."),
    createUserId : z.string().min(1, "모임장 아이디가 누락됐습니다."),
    mettingDate : z.preprocess(
        value => {
            if(typeof value === "string" && value) {
                return new Date(value)
            }
            else return value
        },
        z.date("모임 날짜를 선택해주세요.").refine((date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return date >= today;
    }, "오늘 이전 날짜는 선택할 수 없습니다.")
    ),
    members : z.array(z.string().min(1, "참여자 아이디가 누락됐습니다.")).min(1, "참여자는 최소 1명 이상이어야 합니다."),
    totalMember : z.number().min(2, "최소 두명 이상으로 해주세요."),
    exhibitionSeq : z.preprocess(
        value => typeof value === "number" ? String(value) : value,
        z.string().min(1, "전시 고유 아이디가 누락됐습니다.")
    ),

    mettingContents : z.string().optional(),

    mettingId : z.string().optional()
})
