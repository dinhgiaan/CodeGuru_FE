
import { Subtitles } from "lucide-react";
import { apiSlice } from "../api/apiSlice";
import EditCategories from "@/app/components/Admin/Customization/EditCategories";

export const layoutApi = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        getHeroData:builder.query({
            query:(type) => ({
                url:`get-layout/${type}`,
                method:"GET",
                credentials:"include" as const,
            })
        }),
        editLayout: builder.mutation({
            query: ({type,image,title,SubTitle,faq,categories}) => ({
                url: `edit-layout`,
                body:{
                    type,
                    image,
                    title,
                    SubTitle,
                    faq,
                    categories
                },
                method:"PUT",
                credentials:"include" as const,
            })
        })
    })
})
export const {useGetHeroDataQuery, useEditLayoutMutation} = layoutApi;